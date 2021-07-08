import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  FormControl,
  InputGroup,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import "./Main.css";

const Socket = io.connect("http://localhost:4000");

function Main() {
  const [mssgs, setMssgs] = useState([]);
  const [currentMssg, setCurrentMssg] = useState("");

  const messagesEndRef = useRef(null);

  const { user, roomid } = useParams();
  useEffect(() => {
    Socket.emit("joinroom", { user, roomid });

    Socket.on("intro-mssg", (username) => {
      console.log("hi");
      console.log(username);
      toast.success(`${username} has joined the Room`);
      setMssgs([
        ...mssgs,
        { username: "Chatapp", mssg: "Welcome to the chatapp" },
      ]);
    });
  }, []);

  function sendmssg() {
    console.log(currentMssg);
    console.log(user);
    // setMssgs([...mssgs, { username: user, mssg: currentMssg }]);
    // setMssgs([...getmssgs]);
    Socket.emit("sendmssg", { user, currentMssg });
    Socket.on("getmssg", ({ user, currentMssg }) => {
      // console.log(user);
      // console.log(currentMssg);
      setMssgs([...mssgs, { username: user, mssg: currentMssg }]);
    });
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }

  return (
    <div className="main-screen">
      <ToastContainer />
      <Card style={{ width: "30rem" }}>
        <ListGroup variant="flush">
          {mssgs.map((payload, index) => {
            return (
              <div className="message" key={index}>
                <p className="meta">{payload.username}</p>
                <p className="text">{payload.mssg}</p>
              </div>
            );
          })}
        </ListGroup>
      </Card>
      <InputGroup className="mb-9">
        <FormControl
          placeholder="Type a message "
          aria-describedby="basic-addon2"
          value={currentMssg}
          onChange={(e) => {
            setCurrentMssg(e.target.value);
          }}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={sendmssg}>
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <div ref={messagesEndRef} className="last-block"></div>
    </div>
  );
}

export default Main;
