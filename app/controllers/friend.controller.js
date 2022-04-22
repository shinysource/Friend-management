const { check, validationResult } = require('express-validator');

const db = require("../models");
const Friend = db.friend;
const Op = db.Sequelize.Op;

exports.create = [check('friendname', 'Friendname is required').not().isEmpty(),
  (req, res) => {
    const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
      res.json(errors)
  }

  Friend.create({
    friendname: req.body.friendname,
    email: req.body.email,
    gender: req.body.gender,
    age: req.body.age,
    hobbies: req.body.hobbies,
    description: req.body.description,
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

exports.findAll = (req, res) => {
  const friendname = req.query.friendname
  const email = req.query.email
  
  let condition = {[Op.or]: [
    {friendname: friendname ? { friendname: { [Op.like]: `%${friendname}%` } } : null},
    {email: email ? { email: email } : null}
  ]}

  Friend.findAll({ where: condition })
    .then(friend => {
      res.status(200).send({
        data: { 
          friend: friend,
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

exports.findByUserId = (req, res) => {
  const friendname = req.query.friendname
  const email = req.query.email
  
  let condition = {[Op.or]: [
    {friendname: friendname ? { friendname: { [Op.like]: `%${friendname}%` } } : null},
    {email: email ? { email: email } : null}
  ]}
  condition = {[Op.and]: [
    {userId: req.user.id}
  ]}
  
  Friend.findAll({ where: condition })
    .then(friend => {
      res.status(200).send({
        data: { 
          friend: friend,
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

exports.deleteAll = (req, res) => {
  let condition = {userId: req.user.id}
  Friend.destroy({
    where: {condition},
    truncate: false
  })
    .then(nums => {
        res.status(200).send({
          data: {
            message: `${nums} Friends was deleted successfully.`
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
