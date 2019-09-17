const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("Wiki", () => {
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
            this.user = user; //store the user

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
        })
      })
     });


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
      



    describe("#create()", () => {
        it("should create a private Wiki object with a valid title and body", (done) => {
            Wiki.create({
                title: "History of Space Exploration",
                body: "The first realistic proposal of spaceflight goes back to Konstantin Tsiolkovsky.",
                private: true
            })
            .then((wiki) => {
                expect(wiki.title).toBe("History of Space Exploration");
                expect(wiki.body).toBe("The first realistic proposal of spaceflight goes back to Konstantin Tsiolkovsky.");
                expect(wiki.private).toBe(true);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
        it("should not create a wiki with a title already taken", (done) => {
            Wiki.create({
              title: "History of Space Exploration",
              body: "The first realistic proposal of spaceflight goes back to Konstantin Tsiolkovsky.",
              private: true
            })
            .then((wiki) => {
              Wiki.create({
                  title: "History of Space Exploration",
                  body: "Spaceflight became an engineering possibility with the work of Robert H. Goddard.",
                  private: true
              })
              .then((wiki) => {
                // the code in this block will not be evaluated since the validation error
                // will skip it. Instead, we'll catch the error in the catch block below
                // and set the expectations there
                done();
              })
              .catch((err) => {
                expect(err.message).toContain("Validation error");
                done();
              });
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          });
      
        });

        describe("#setUser", () => {
            it("should associate a wiki and a user together", (done) => {
                User.create({
                    username: "user_name",
                    email: "user@example.com",
                    password: "1234567890"
                })
                .then((user) => {
                    this.user = user;

                    Wiki.create({
                        title: "History of Space Exploration",
                        body: "The first realistic proposal of spaceflight goes back to Konstantin Tsiolkovsky.",
                        private: true,
                        userId: this.user.id
                    })
                    .then((wiki) => {
                        expect(wiki.userId).toBe(this.user.id);
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
});
          });
        });
    });
})