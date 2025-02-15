import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      localStorage.removeItem("token");
      const response = await axios.post(
        "https://localhost:7224/api/auth/login",
        { email, password }
      );

      const token = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `apiKey ${token}`;
      console.log("Authorization header:", `apiKey ${token}`);

      const decodedToken = jwtDecode(token);
      console.log("decoToken", decodedToken);

      const userRole =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
        console.log("userRole", userRole);
      switch (userRole) {
        case "Admin":
          navigate("/Admin");
          break;
        case "Staff":
          navigate("/Staff");
          break;
        case "Customer":
          navigate("/");
          break;
        default:
          setError("Vai trò không hợp lệ");
          break;
      }

      setIsLoggedIn(true);
    } catch (error) {
      setError("Đã xảy ra lỗi khi đăng nhập");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        customerEmail: email,
        customerSName: username,
        // loginName: username,
        password: password,
        phoneNumber: "",
      };

      const response = await axios.post(
        "https://localhost:7224/api/Customer/Create",
        newUser
      );

      if (response.status === 200) {
        setError("");
        toast.success("Đăng ký thành công!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        setError("Đã xảy ra lỗi khi đăng ký");
      }
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
        <ToastContainer />;
      </div>
    </div>
  );
};

export default LoginForm;
