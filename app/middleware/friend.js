const jwt = require("jsonwebtoken");
const db = require("../models");
const Friend = db.friend;

isUser = (req, res, next) => {
  const id = req.params.id
  const userId = req.userId

  let condition = { where: id ? { id } : null }

  Friend.findOne(condition).then(friend => {
      if (friend.userId === userId) {
        next();
        return;
    }
    res.status(403).send({
      data: {
        message: "Require User Role!"
      }
    });
    return;
  });
};

const friend = {
  isUser: isUser
};
module.exports = friend;
