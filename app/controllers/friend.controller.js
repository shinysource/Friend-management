const { check, validationResult } = require('express-validator');
const { authJwt } = require("../middleware");

const db = require("../models");
const Friend = db.friend;
const User = db.user;
const Op = db.Sequelize.Op;

const isAdmin = async (req) => {
  await User.findByPk(req.userId).then(async user => {
    return req.user.roleId;
  })
};

exports.create = [check('friendname', 'Friendname is required').not().isEmpty(),
  (req, res) => {
    const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
      return res.json(errors)
  }

  Friend.create({
    ...req.body,
    userId: req.user.id
  })
    .then(friend => {
      res.status(200).send({
        data: {
          friend: friend,
          message: "Friend was created successfully"
        }
      })      
    })
    .catch(err => {
      res.status(500).send({ data: { message: err.message }});
    });
}]

exports.findAll = async (req, res) => {
  const userId = req.userId

  await isAdmin(req)
  
  let condition = {where: ''}
  let include = {}

  if (req.role === "user") {
    condition = {where: userId ? { userId: userId } : null}
  } else {
    console.log('admin')
    include = {
      include: [{
        model: User,
        required: true,
        as: "user",
        attributes: ['username']
      }]
    }
  }
  
  Friend.findAll(include, condition)
  .then(friend => {
    res.status(200).send({
      data: { 
        friends: friend,
        message: 'Some friends was retrieved successfully'
      }
    })
  })
  .catch(err => {
    res.status(500).send({
      data: {
        message: err.message || "Some error occured while retrieving friends."
      }
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id

  Friend.findByPk(id)
    .then(friend => {
      if (friend) {
        res.status(200).send({
          data: {
            friend: friend,
            message: 'Friend was retrieved successfully'
          }
        })
      } else {
        res.status(404).send({
          data: {
            message: `Cannot find Friend with id=${id}.`
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        data: {
          message: err.message || "Some error occured while retrieving friends."
        }
      })
    })
};

exports.update = (req, res) => {
  const id = req.params.id

  Friend.update({
    friendname: req.body.friendname,
    email: req.body.email,
    gender: req.body.gender,
    age: req.body.age,
    hobbies: req.body.hobbies,
    description: req.body.description
  }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        Friend.findByPk(id).then(friend => {
          if (friend) {
            res.status(200).send({
              friend: friend,
              message: "Friend was updated successfully."
            })
          }
        })
        .catch(err => {
          res.status(500).send({
            data:{
              message: err.message || "Some error occured while retrieving friends."
            }
          })
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
        message: err.message || "Some error occured while retrieving friends."
      })
    })
};

exports.delete = (req, res) => {
  const id = req.params.id

  Friend.destroy({
    where: {id: id}
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          data: {
            message: "Friend was deleted successfully."
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