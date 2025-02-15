import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://65edbd9708706c584d9a764a.mockapi.io/LoginForm"
      );

      const userData = response.data;

      const user = userData.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        if (user.role === "admin") {
          navigate("/Admin");
        } else if (user.role === "staff") {
          navigate("/Staff");
        } else if (user.role === "user") {
          navigate("/");
        }
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      setError("Đã xảy ra lỗi khi đăng nhập");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://65edbd9708706c584d9a764a.mockapi.io/LoginForm"
      );

      const existingUsers = response.data;

      const newId = (existingUsers.length + 1).toString();

      const existingUser = existingUsers.find((user) => user.email === email);
      if (existingUser) {
        setError("Email đã được sử dụng. Vui lòng chọn một email khác.");
        return;
      }

      const newUser = {
        id: newId,
        email: email,
        password: password,
        username: username,
        role: "user",
      };

      await axios.post(
        "https://65edbd9708706c584d9a764a.mockapi.io/LoginForm",
        newUser
      );
      setSuccessMessage("Đăng ký thành công!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/Đăng_nhập");
      }, 1000);
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      setError("Đã xảy ra lỗi khi đăng ký");
    }
  };

  return (
    <div className="LoginContainer">
      <div className="Loginmain">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSignup}>
            <label htmlFor="chk" aria-hidden="true">
              Đăng kí
            </label>
            <input
              type="text"
              name="txt"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required=""
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required=""
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required=""
            />
            <button className="Hoverbutton" type="submit">
              Đăng kí
            </button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Đăng nhập
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required=""
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required=""
            />
            <button className="Hoverbutton" type="submit">
              Đăng nhập
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
  <ToastContainer />;
};

export default LoginForm;
