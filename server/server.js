require("dotenv").config();
const express = require("express");
const apiRoutes = require("./src/routes/main.route");
const cors = require("cors");
const { connectMoralis } = require("./src/configs/moralis.config");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

apiRoutes(app);

connectMoralis();

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
