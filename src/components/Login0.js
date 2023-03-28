import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <form>
        <h1>登录</h1>

        <div className="input-wrapper">
          <input type="text" placeholder="请输入用户名" id="username" name="username" required />
          <label htmlFor="username"></label>
        </div>

        <div className="input-wrapper">
          <input type="password" placeholder="请输入密码" id="password" name="password" required />
          <label htmlFor="password"></label>
        </div>

        <button type="submit" className="login-button">登录</button>

        <div className="signup-container">
          <div className="signup-left">
            没有账户？<a href="#">注册</a>
          </div>
          <div className="signup-right">
            忘记密码？<a href="#">找回</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
