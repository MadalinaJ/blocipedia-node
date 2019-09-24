require("dotenv").config();
const User = require("./models").User;
const Wiki = require("./models").Wiki;
const bcrypt = require("bcryptjs");
const Collaborator = require('./models').Collaborator;
const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

// #4
    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
       to: newUser.email,   //'madalina.jantea@gmail.com'
	     from: 'madalina.jantea@gmail.com',
        subject: 'User Confirmation',
        text: 'blocipedia',
       html: '<strong>Please login to confirm membership</strong>',
      };
      sgMail.send(msg);
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback){
    let result = {};
    User.findByPk(id)
    .then((user) => {
      if(!user){
        callback(404);
      } else {
        result["user"] = user;
        Collaborator.scope({method: ["collaboratorFor", id]}).findAll()
        .then((collaborator) => {
          result["collaborator"] = collaborator;
          callback(null, result);
        })
        .catch((err) => {
          callback(err);
  
        })
      }
    })
  },


  upgrade(id, callback){
    return User.findByPk(id)
    .then((user) => {
      if(!user){
        return callback("User does not exist!");
      } else{
      return user.updateAttributes({role: "premium"});
    }
    }) .catch((err) =>{
      callback(err);
    })
  },

  downgrade(id, callback){
    return User.findByPk(id)
    .then((user) => {
      if(!user){
        return callback("User does not exist!");
      } else{
        return user.updateAttributes({role: "standard"})
      }
    }) .catch((err) => {
      callback(err);
    })
  }

}