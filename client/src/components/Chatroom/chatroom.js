import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

function Chatroom() {
  const [room, setRoom] = useState("");
  const { user } = useParams();
  const history = useHistory();

  function handleChange() {
    // console.log(user); // got the user
    history.push(`/chatroom/${user}/${room}`);
  }

  return (
    <div className="text-center">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="Bold">Room</Form.Label>
          <Form.Control
            placeholder="Enter room"
            className="text-center"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            share this room code with your friends to let them join
          </Form.Text>
        </Form.Group>
        <Button variant="info" onClick={handleChange}>
          Enter
        </Button>
      </Form>
    </div>
  );
}

export default Chatroom;
