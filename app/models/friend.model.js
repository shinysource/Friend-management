module.exports = (sequelize, Sequelize) => {
  const Friend = sequelize.define("Friend", {
    friendname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true
    },
    gender: {
      type: Sequelize.ENUM("male", "female")
    },
    age: {
      type: Sequelize.INTEGER
    },
    hobbies: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  })
  return Friend;
}