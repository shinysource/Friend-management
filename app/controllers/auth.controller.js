const { check, validationResult } = require('express-validator');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

exports.me = (req, res) => {
  
    user = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      password: req.user.password,
      roleId: req.user.roleId
    }
    res.status(200).json({
      data: {
        user: user,
        message: "Authorized succesfully"
      } 
    })
}

exports.signup =
[
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty().isEmail(),
  check('password', 'Password is required').not().isEmpty().isLength({
    min: 5
  }),
  (req, res) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
      return res.json(errors)
  }

  new Promise((resolve, reject) => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: req.body.roles
        }
      }).then(() => {
        resolve(2);
      })
    } else {
      resolve(1);
    }
  })
  .then(roleId => {
    console.error('roleId', roleId);

    return User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      roleId: roleId
    })
  })
  .then(user => {
  
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).json(
      {
        data: {
          user: user,
          token: token,
          message: 'User registered successfully!'
        }
      });
  })
  .catch(err => {
    res.status(500).json({ data: { message: err.message }});
  });
}];

exports.signin =
[
  check('email', 'Email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  (req, res) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
      return res.json(errors)
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({ data: {message: "User Not found." }});
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          data: {
            token: null,
            message: "Invalid Password!"
          }
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      temp = {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        roleId: user.roleId
      }
      res.status(200).send({
        data: {
          user: temp,
          token: token,
          message: "Login successfully!"
        }
      });
    })
    .catch(err => {
      res.status(500).send({ data: { message: err.message }});
    });
}];
