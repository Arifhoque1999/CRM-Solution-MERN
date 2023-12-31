const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5000;

require("./models/user");
require("./models/inventory")

app.use(express.json()); //parsing the req before it get to routes

// app.use(cors())
app.use(require("./routes/auth"));
app.use(require("./routes/inventory"));

mongoose.connect(process.env.MONG_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mogodb");
});
mongoose.connection.on("error", () => {
  console.log("Error while connecting to mogodb");
});

app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT} `);
});
