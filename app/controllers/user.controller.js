var bcrypt = require("bcryptjs");
const db = require("../models");
const { check, validationResult } = require('express-validator');

const User = db.user;
const Op = db.Sequelize.Op;

exports.create =
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

      if (req.body.roles) {
        Role.findAll({
          where: {
            name: req.body.roles
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            temp = {
              id: user.id,
              username: user.username,
              email: user.email,
              password: user.password,
              roles: req.body.roles
            }
            res.status(200).json(
              {
                data: {
                  user: temp,
                  message: 'User created successfully!'
                }
              });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          temp = {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            roles: 'user'
          }
          res.status(200).json({
            data: {
              user: temp,
              message: "User created successfully!"
            }
          });
        });
      }
    })
    .catch(err => {
      res.status(500).json({ data: { message: err.message }});
    });
}];

exports.findAll = (req, res) => {
  // const username = req.query.username
  // const email = req.query.email

  // let condition = username ? { username: { [Op.like]: `%${username}%` } } : null
  // condition = email ? { email: email } : null
  User.findAll()
    .then(user => {
      res.status(200).send({
        data: {
          users: user,
          message: 'Some users are retrieved successfully'
        }
      })
    })
    .catch(err => {
      res.status(500).send({
        data: {
          message: err.message || "Some error occured while retrieving users."
        }
      })
    })
};

exports.findOne = (req, res) => {
  const id = req.params.id

  User.findByPk(id)
    .then(user => {
      if (user) {
        res.status(200).send({
          data: {
            user: user,
            message: 'Some users are retrieved successfully'
          }
        })
      } else {
        res.status(404).send({
          data: {
            message: `Cannot find User with id=${id}.`
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        data: {
          message: err.message || "Some error occured while retrieving tutorials."
        }
      })
    })
};

exports.update = (req, res) => {
  const id = req.params.id

  User.update({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          data: 
          {
            message: "User was updated successfully."
          }
      })
      } else {
        res.status(404).send({
          data: {
            message: `Cannot update with id=${id}.`
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        data: {
          message: err.message || "Some error occured while retrieving tutorials."
        }
      })
    })
};

exports.delete = (req, res) => {
  const id = req.params.id

  User.destroy({
    where: {id: id}
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          data: {
            message: "User was deleted successfully."
          }
        })
      } else {
        res.status(404).send({
          data: {
            message: `Cannot delete with id=${id}.`
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        data: {
          message: err.message || "Some error occured while retrieving tutorials."
        }
      })
    })
};

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
        res.status(200).send({
          data: {
            message: `${nums} Users was deleted successfully.`
          }
        })
    })
    .catch(err => {
      res.status(500).send({
        data: {
          message: err.message || "Some error occured while retrieving tutorials."
        }
      })
    })
};
