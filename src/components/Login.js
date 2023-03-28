import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      //successMessage: "",
      //failedMessage: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    // Replace with your own API URL
    const url = "https://example.com/api/login";
    axios
      .post(url, { username, password })
      .then((response) => {
        // Handle success response
        this.setState({
          message: response.data.message,
          //message: "登录成功！",
        });
        this.props.history.goBack(); // Redirect to the previous page
        // Redirect to homepage
        //window.location.href = "/";
      })
      .catch((error) => {
        // Handle error response
        this.setState({
          message: error.response.data.message,
          //message: "登录失败！",
          username: "",
          password: "",
        });
      });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="login-container">
        <video src="/videos/video-1.mp4" autoPlay loop muted />
        <form onSubmit={this.handleSubmit}>
          <h1>登录</h1>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="请输入用户名"
              id="username"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="username"></label>
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="请输入密码"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="password"></label>
          </div>

          <button type="submit" className="login-button">
            登录
          </button>

          {message && <p className="message">{message}</p>}

          <div className="signup-container">
            <div className="signup-left">
              没有账户？<Link to="/register">注册</Link>
            </div>
            <div className="signup-right">
              {/*忘记密码？<a href="#">找回</a>*/}
              忘记密码？<Link to="/ForgotPassword">找回</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
