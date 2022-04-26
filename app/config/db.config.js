module.exports = {
  HOST: process.env.DB_MYSQL_HOST || "localhost",
  USER: process.env.DB_MYSQL_USER || "root",
  PASSWORD: process.env.DB_MYSQL_PASSWORD || "",
  DB: process.env.DB_MYSQL_DB || "frienddb",
  dialect: process.env.DB_MYSQL_DIALECT || "mysql",
  pool: {
    max: parseInt(process.env.DB_MYSQL_POOL_MAX) || 5,
    min: parseInt(process.env.DB_MYSQL_POOL_MIN) || 0,
    acquire: parseInt(process.env.DB_MYSQL_POOL_ACQUIRE) || 30000,
    idle: parseInt(process.env.DB_MYSQL_POOL_IDLE) || 10000
  }
}