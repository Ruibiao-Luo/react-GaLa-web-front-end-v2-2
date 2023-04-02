import React, { useState } from "react";
import "./Register.css";
// 导入Axios库
import axios from "axios";
//import axiosInstance from "axios";

/*const axiosInstance = axios.create({
  baseURL: "http://60.205.202.47:8002",
});*/

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 使用Axios库发送HTTPS请求
    axios
      .post(
        //"https://60.205.202.47:8002/users/register",
        "https://www.eeoaa.com:8000/users/register",
        {
          username,
          password,
          confirmPassword,
          email,
          gender,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // 处理成功或失败的响应
      .then((response) => {
        console.log(response.data);
        alert("注册成功！"); // 在这里添加成功的提示信息
      })
      .catch((error) => {
        console.error(error);
        alert("注册失败，请重试。"); // 在这里添加失败的提示信息
      });
    /*console.log(
      `Username: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}, Email: ${email}, Gender: ${gender}`
    );*/
  };

  return (
    <div className="register-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <form onSubmit={handleSubmit}>
        <h1>注册</h1>
        <div className="input-wrapper">
          <input
            placeholder="用户名"
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            placeholder="密码"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            placeholder="确认密码"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            placeholder="邮箱"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <select
            id="gender"
            value={gender}
            onChange={handleGenderChange}
            required
          >
            <option value="">性别</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <button type="submit" className="login-button">
          注册
        </button>
      </form>
    </div>
  );
}

export default Register;
