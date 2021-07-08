const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const users = require("./Routes/users");

const app = express();
const mongoDB = "mongodb://127.0.0.1/ChatApp";

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("could not connect to mongoDB"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());

// Socket server
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (Socket) => {
  console.log("Socket is active to be connected");
  Socket.on("joinroom", ({ user, roomid }) => {
    const userx = userJoin(Socket.id, user, roomid);
    Socket.join(userx.room);
    io.to(userx.room).emit("intro-mssg", userx.username);
  });

  Socket.on("sendmssg", ({ user, currentMssg }) => {
    io.emit("getmssg", { user, currentMssg });
  });
});

//Express Server

app.get("/", (req, res) => {
  res.send("request successfully sent!");
});

app.use("/users", users);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
