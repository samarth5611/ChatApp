import { useState, React } from "react";
import axios from "axios";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";

function Register() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/users/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      history.push(`/chatroom/${name}`);
      console.log(data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Invalid Email Or Password");
      }
    }
  }

  return (
    <div>
      <form className="login-form">
        <h3>Register</h3>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <Button
          className="btn btn-dark btn-lg btn-block"
          onClick={handleSubmit}
        >
          Register
        </Button>
        <p className="forgot-password text-right">
          Already registered <a href="/login">log in?</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
