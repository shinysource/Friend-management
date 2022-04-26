const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.friend = require("../models/friend.model.js")(sequelize, Sequelize);

db.user.belongsTo(db.role, {
  foreignKey: "roleId",
  as: "role"
})

db.friend.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
})

db.ROLES = ["user", "admin"];

module.exports = db;
