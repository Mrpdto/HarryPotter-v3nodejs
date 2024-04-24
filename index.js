const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const ip = require("ip");
const ipAdr = ip.address();

let lastHouseVisited = "Griffindor";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/", require("./routes/start"));

app.get("/lastcard", (req, res) => {
  return res.json({message : lastHouseVisited});
});

app.post("/lastcard", (req, res) => {
  lastHouseVisited = req.body.lastHouseVisited;
  return res.json({message : lastHouseVisited});
});

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Server run: ${ipAdr}:${port}`);
  });
};

initializeApp();
