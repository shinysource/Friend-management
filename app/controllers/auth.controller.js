const { check, validationResult } = require('express-validator');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

exports.verify = (req, res) => {
  res.status(200).json({
    data: {
      user: req.user,
      message: "Authorized succesfully"
    } 
  })
}

exports.signup =
[
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty().isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  (req, res) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
      res.json(errors)
  }
  
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      if (req.body.roles) {
        Role.findAll({
          where: {
            name: req.body.roles
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.status(200).json(
              {
                data: {
                  user: user,
                  token: token,
                  message: 'User registered successfully!'
                }
              });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.status(200).json({
            data: {
              user: user,
              token: token,
              message: "User registered successfully!"
            }
          });
        });
      }
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
      res.json(errors)
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
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          data: {
            user: user,
            token: token,
            message: "You are login successfully!"
          }
        });
      });
    })
    .catch(err => {
      res.status(500).send({ data: { message: err.message }});
    });
}];
