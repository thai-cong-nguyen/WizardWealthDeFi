const tokenRouter = require("./token.route");

const apiRoutes = (app) => {
  app.use("/api/token", tokenRouter);
};

module.exports = apiRoutes;
