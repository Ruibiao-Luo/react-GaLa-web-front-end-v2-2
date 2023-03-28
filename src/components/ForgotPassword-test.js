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
      passwordMismatch: false,
      sending: false,
      timeLeft: 60,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitEmail = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const url = "https://example.com/api/forgot-password";
    axios
      .post(url, { email })
      .then((response) => {
        this.setState({
          message: response.data.message,
          codeSent: true,
        });
        this.startTimer();
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.message,
        });
      });
  };

  handleSubmitCode = (e) => {
    e.preventDefault();
    const { email, code } = this.state;
    const url = "https://example.com/api/check-code";
    axios
      .post(url, { email, code })
      .then((response) => {
        this.setState({
          passwordError: false,
          codeError: false,
        });
      })
      .catch((error) => {
        this.setState({
          passwordError: true,
          codeError: true,
        });
      });
  };

  handleSubmitPassword = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        passwordError: false,
        passwordMismatch: true,
      });
      return;
    }
    const url = "https://example.com/api/reset-password";
    axios
      .post(url, { password })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.message,
        });
      });
  };

  handleResend = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const url = "https://example.com/api/forgot-password";
    axios
      .post(url, { email })
      .then((response) => {
        this.setState({
          message: response.data.message,
          codeSent: true,
          timeLeft: 60,
        });
        this.startTimer();
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.message,
        });
      });
  };

  startTimer() {
    let timeLeft = 60;
    this.setState({ sending: true });
    const timer = setInterval(() => {
      if (timeLeft === 0) {
        this.setState({ sending: false });
        clearInterval(timer);
      } else {
        timeLeft--;
        this.setState({ timeLeft });
      }
    }, 1000);
  }

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
      passwordMismatch,
      sending,
      timeLeft,
    } = this.state;

    if (!codeSent) {
      return (
        <div className="forgot-password-container">
          <h2>Forgot Password</h2>
          <form onSubmit={this.handleSubmitEmail}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </label>
            <button type="submit" disabled={sending}>
              {sending ? `Sending (${timeLeft}s)` : "Send Code"}
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      );
    }

    return (
      <div className="forgot-password-container">
        <h2>Reset Password</h2>
        <form onSubmit={this.handleSubmitCode}>
          <label>
            Verification Code:
            <input
              type="text"
              name="code"
              value={code}
              onChange={this.handleChange}
              required
            />
          </label>
          <button type="submit">Verify Code</button>
          {codeError && (
            <p className="error-message">Invalid code. Please try again.</p>
          )}
        </form>

        <form onSubmit={this.handleSubmitPassword}>
          <label>
            New Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              required
            />
          </label>
          <button type="submit">Reset Password</button>
          {passwordError && (
            <p className="error-message">
              There was an error resetting your password. Please try again
              later.
            </p>
          )}
          {passwordMismatch && (
            <p className="error-message">
              The passwords do not match. Please try again.
            </p>
          )}
          {message && <p className="message">{message}</p>}
        </form>

        <button onClick={this.handleResend} disabled={sending}>
          {sending ? `Resend Code (${timeLeft}s)` : "Resend Code"}
        </button>
      </div>
    );
  }
}
export default ForgotPassword;
