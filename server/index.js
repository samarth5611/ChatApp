const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const users = require("./Routes/users");

const app = express();
const mongoDB = "mongodb://127.0.0.1/ChatApp";

// if (!config.get("jwtPrivateKey")) {
//   console.log("FATAL ERROR: JwtPrivateKey not defined");
//   process.exit(1);
// }

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("could not connect to mongoDB"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("request successfully sent!");
});

app.use("/users", users);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
