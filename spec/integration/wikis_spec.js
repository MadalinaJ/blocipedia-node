
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("routes : wikis", () => {

  beforeEach((done) => {
    this.user;
    this.wiki;
    sequelize.sync({force: true}).then((res) => {
      User.create({
        username: "user_name",
        email: "user@example.com",
        password: "password",
        role: "standard"
      })
      .then((user) => {
        this.user = user;
        request.get({
          url: "http://localhost:3000/auth/fake",
          form: {
            id: user.id,
            username: user.name,
            email: user.email,
            role:user.role,
          }
        });

        Wiki.create({
          title: "Dogs" ,
          body: "There are a lot of them",
          userId: user.id,
          private: false
        })
        .then((wiki) => {
          this.wiki = wiki;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });

  describe("GET /wikis", () => {

    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

  describe("POST /wikis/create", () => {
    it("should create new wiki and redirect", (done) => {
      const options = {
        url: `${base}create`,
        form: {
          title: "Cats",
          body: "Cats are super cute",
          userId: this.user.id,
          private: false
        }
      };

      request.post(options,
        (err, res, body) => {
          Wiki.findOne({where: {title: "Cats"}})
          .then((wiki) => {
            expect(wiki.title).toBe("Cats");
            expect(wiki.body).toBe("Cats are super cute");
            expect(wiki.private).toBe(false);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("POST /wikis/:id/destroy", () => {
    it("should delete wiki with the associated ID", (done) => {
      Wiki.findAll()
      .then((wikis) => {
        const wikiCountBeforeDelete = wikis.length;
        expect(wikiCountBeforeDelete).toBe(1);
        request.post(`${base}${this.wiki.id}/destroy`, (err, res, body) => {
          Wiki.findAll()
          .then((wikis) => {
            expect(err).toBeNull();
            expect(wikis.length).toBe(wikiCountBeforeDelete - 1);//1
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          })
        });
      })
    });
  });

});
