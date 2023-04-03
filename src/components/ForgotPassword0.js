import React, { Component } from "react";
import axios from "axios";
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    // Replace with your own API URL
    const url = "https://example.com/api/forgot-password";
    axios
      .post(url, { email })
      .then((response) => {
        // Handle success response
        this.setState({
          message: response.data.message,
        });
      })
      .catch((error) => {
        // Handle error response
        this.setState({
          message: error.response.data.message,
        });
      });
  };

  render() {
    const { email, message } = this.state;
    return (
      <div className="forgot-container">
        <video src="/videos/video-1.mp4" autoPlay loop muted />
        <form onSubmit={this.handleSubmit}>
          <h1>找回密码</h1>

          <div className="forgot-input-wrapper">
            <input
              type="email"
              placeholder="请输入注册邮箱"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
              className="forgot-input"
            />
            <label htmlFor="email"></label>
          </div>

          <button type="submit" className="forgot-button">
            发送邮件
          </button>

          {message && <p className="forgot-message">{message}</p>}

          <div className="back-to-login">
            <a href="/login">返回登录</a>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
