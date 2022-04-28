const { authJwt } = require("../middleware");
const { friend } = require("../middleware");
const controller = require("../controllers/friend.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/friends/",
    [authJwt.verifyToken],
    controller.create
  )

  app.get(
    "/api/friends/",
    [authJwt.verifyToken],
    controller.findAll
  )

  app.get(
    "/api/friends/:id",
    [authJwt.verifyToken, friend.isUser],
    controller.findOne
  );

  app.put(
    "/api/friends/:id",
    [authJwt.verifyToken],
    controller.update
  );

  app.delete(
    "/api/friends/:id",
    [authJwt.verifyToken],
    controller.delete
  );
};
