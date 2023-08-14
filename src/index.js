const express = require("express");

const bodyParser = require("body-parser");

const apiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");
const {M} = require("./utils/messageQueue");
const db = require("./models/index");

const prepareAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async (req, res) => {
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
    console.log(`Server started on port ${PORT}`);
  });
};

prepareAndStartServer();
