import React, { Component } from "react";
import axios from "axios";
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      code: "",
      codeSent: false,
      codeError: false,
      password: "",
      confirmPassword: "",
      passwordError: false,
      successMessage: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSendCode = () => {
    const { email } = this.state;
    // Replace with your own API URL for sending verification code
    const url = "https://example.com/api/send-verification-code";
    axios
      .post(url, { email })
      .then((response) => {
        // Handle success response
        this.setState({
          codeSent: true,
          codeError: false,
          message: "验证码已发送到您的邮箱，请检查并输入验证码。",
        });
        setTimeout(() => {
          this.setState({ message: "" });
        }, 60000); // Cool down for 60 seconds
      })
      .catch((error) => {
        // Handle error response
        this.setState({
          codeSent: false,
          codeError: true,
          message: error.response.data.message,
        });
      });
  };

  handleVerifyCode = (e) => {
    e.preventDefault();
    const { email, code } = this.state;
    // Replace with your own API URL for verifying verification code
    const url = "https://example.com/api/verify-code";
    axios
      .post(url, { email, code })
      .then((response) => {
        // Handle success response
        this.setState({
          codeError: false,
          passwordError: false,
          successMessage: "",
        });
        this.props.history.push("/reset-password"); // Redirect to reset password page
      })
      .catch((error) => {
        // Handle error response
        this.setState({
          codeError: true,
          passwordError: false,
          successMessage: "",
        });
      });
  };

  handleResetPassword = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        passwordError: true,
        successMessage: "",
      });
    } else {
      // Replace with your own API URL for resetting password
      const url = "https://example.com/api/reset-password";
      axios
        .post(url, { email, password })
        .then((response) => {
          // Handle success response
          this.setState({
            passwordError: false,
            successMessage: "密码已成功重置。",
          });
          setTimeout(() => {
            this.props.history.goBack(); // Redirect to previous page after 2 seconds
          }, 2000);
        })
        .catch((error) => {
          // Handle error response
          this.setState({
            passwordError: true,
            successMessage: "",
          });
        });
    }
  };

  render() {
    const {
      email,
      message,
      code,
      codeSent,
      codeError,
      password,
      confirmPassword,
      passwordError,
      successMessage,
    } = this.state;
    return (
      <div className="forgot-container">
        <video src="/videos/video-1.mp4" autoPlay loop muted />
        {!codeSent && !codeError && (
          <form onSubmit={this.handleSendCode}>
            <h1>找回密码</h1>
            <div className="forgot-input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="请输入注册邮箱"
                value={email}
                onChange={this.handleChange}
                required
              />
              <button type="submit">发送验证码</button>
            </div>
          </form>
        )}
        {codeSent && !codeError && (
          <form onSubmit={this.handleVerifyCode}>
            <h1>验证邮箱</h1>
            <p>{message}</p>
            <div className="forgot-input-wrapper">
              <input
                type="text"
                name="code"
                placeholder="请输入6位数验证码"
                value={code}
                onChange={this.handleChange}
                required
              />
              <button type="submit">验证</button>
            </div>
          </form>
        )}
        {codeError && (
          <div>
            <h1>找回密码</h1>
            <p>{message}</p>
            <form onSubmit={this.handleSendCode}>
              <div className="forgot-input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="请输入注册邮箱"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <button type="submit">重新发送</button>
              </div>
            </form>
          </div>
        )}
        {successMessage && (
          <div>
            <h1>重置密码</h1>
            <p>{successMessage}</p>
            <form onSubmit={this.handleResetPassword}>
              <div className="forgot-input-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="请输入新密码"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="请再次输入新密码"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                />
                <button type="submit">确认</button>
              </div>
            </form>
          </div>
        )}
        {passwordError && (
          <div>
            <h1>重置密码</h1>
            <p>两次密码输入不一致，请重新输入。</p>
            <form onSubmit={this.handleResetPassword}>
              <div className="forgot-input-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="请输入新密码"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="请再次输入新密码"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                />
                <button type="submit">确认</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
export default ForgotPassword;
