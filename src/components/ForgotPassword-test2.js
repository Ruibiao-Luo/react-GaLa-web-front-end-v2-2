import React, { Component } from "react";
import axios from "axios";
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      verificationCode: "",
      verificationCodeSent: false,
      verificationCodeError: "",
      newPassword: "",
      confirmPassword: "",
      passwordUpdateSuccess: false,
      passwordUpdateError: "",
      isButtonDisabled: false,
      countdown: 60,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleVerificationCodeSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    // Replace with your own API URL
    const url = "https://example.com/api/forgot-password/verification-code";
    axios
      .post(url, { email })
      .then((response) => {
        // Handle success response
        this.setState({
          verificationCodeSent: true,
          message: response.data.message,
          verificationCodeError: "",
          isButtonDisabled: true,
        });

        const intervalId = setInterval(() => {
          if (this.state.countdown === 1) {
            clearInterval(intervalId);
            this.setState({ isButtonDisabled: false, countdown: 60 });
          } else {
            this.setState((prevState) => ({
              countdown: prevState.countdown - 1,
            }));
          }
        }, 1000);
      })
      .catch((error) => {
        // Handle error response
        this.setState({
          message: error.response.data.message,
          verificationCodeError: error.response.data.message,
        });
      });
  };

  handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { email, verificationCode, newPassword, confirmPassword } =
      this.state;
    // Replace with your own API URL
    const url = "https://example.com/api/forgot-password/reset-password";
    axios
      .post(url, { email, verificationCode, newPassword, confirmPassword })
      .then((response) => {
        // Handle success response
        this.setState({
          message: response.data.message,
          passwordUpdateSuccess: true,
          passwordUpdateError: "",
        });
      })
      .catch((error) => {
        // Handle error response
        this.setState({
          passwordUpdateError: error.response.data.message,
          passwordUpdateSuccess: false,
        });
      });
  };

  render() {
    const {
      email,
      message,
      verificationCode,
      verificationCodeSent,
      verificationCodeError,
      newPassword,
      confirmPassword,
      passwordUpdateSuccess,
      passwordUpdateError,
      isButtonDisabled,
      countdown,
    } = this.state;
    return (
      <div className="forgot-container">
        <video src="/videos/video-1.mp4" autoPlay loop muted />
        <form
          onSubmit={
            verificationCodeSent
              ? this.handlePasswordSubmit
              : this.handleVerificationCodeSubmit
          }
        >
          <h1>找回密码</h1>

          {!verificationCodeSent ? (
            <>
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

              <button type="submit">获取验证码</button>
              {message && <p className="forgot-message">{message}</p>}

              {verificationCodeError && (
                <p className="forgot-error">{verificationCodeError}</p>
              )}
            </>
          ) : (
            <>
              <div className="forgot-input-wrapper">
                <input
                  type="text"
                  placeholder="请输入验证码"
                  id="verificationCode"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={this.handleChange}
                  required
                  className="forgot-input"
                />
                <label htmlFor="verificationCode"></label>
              </div>

              <div className="forgot-input-wrapper">
                <input
                  type="password"
                  placeholder="请输入新密码"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={this.handleChange}
                  required
                  className="forgot-input"
                />
                <label htmlFor="newPassword"></label>
              </div>

              <div className="forgot-input-wrapper">
                <input
                  type="password"
                  placeholder="请确认新密码"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                  className="forgot-input"
                />
                <label htmlFor="confirmPassword"></label>
              </div>

              <button type="submit">确认修改</button>

              {message && <p className="forgot-message">{message}</p>}

              {passwordUpdateSuccess && (
                <p className="forgot-success">
                  密码修改成功，请返回登录页面重新登录。
                </p>
              )}

              {passwordUpdateError && (
                <p className="forgot-error">{passwordUpdateError}</p>
              )}

              <p className="forgot-timer">
                {`验证码已发送至 ${email}，请在${countdown}秒内输入。`}
              </p>

              <button
                className="forgot-resend-button"
                onClick={this.handleVerificationCodeSubmit}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? `重新发送(${countdown})` : "重新发送"}
              </button>
            </>
          )}
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
