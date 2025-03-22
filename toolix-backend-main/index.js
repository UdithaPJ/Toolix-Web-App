const express = require("express");

const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");

app.use(cors());

const { BODYPARSER, APPLICATION } = require("./config/config");

const router = require("./src/routes");

app.use(bodyParser.json(BODYPARSER.JSON_PARSER));

app.use(bodyParser.urlencoded(BODYPARSER.URLENCODED));

app.use("/", router);

const PORT = APPLICATION.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server connected to http://localhost:${PORT}`);
});
