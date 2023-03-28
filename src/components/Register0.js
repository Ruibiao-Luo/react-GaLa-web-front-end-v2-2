import React, { useState } from "react";
import "./Register.css";

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
    console.log(
      `Username: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}, Email: ${email}, Gender: ${gender}`
    );
  };

  return (
    <div className="register-container">
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

