import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useForm } from "react-hook-form";
import SimpleCaptcha from "./funcmodels/SimpleCaptcha";

const Login = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState(false); //添加一个状态存储验证码是否通过验证
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!captcha) {
        return setMessage("验证码错误！");
      }
      const url = "https://www.eeoaa.com:8000/users/auth";
      const response = await axios.post(url, data);
      localStorage.setItem("token", response.data.token);
      setMessage("登录成功！");
      history.goBack(); //回到之前的页面
    } catch (error) {
      console.log(error);
      setMessage("登录失败！");
    }
  };

  //生成验证码并更新状态
  const generateCaptcha = () => {
    setCaptcha(true);
  };

  return (
    <div className="login-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>登录</h1>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="请输入用户名"
            id="username"
            {...register("username", { required: true })}
          />
          <label htmlFor="username"></label>
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="请输入密码"
            id="password"
            {...register("password", { required: true })}
          />
          <label htmlFor="password"></label>
        </div>
        {captcha ? (
          <SimpleCaptcha
            chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" //可选字符集合
            length={6} //验证码长度
            onComplete={() => setCaptcha(true)} //用一个回调函数获取验证码值（在此项目中可以不需要）
          />
        ) : (
          <div className="input-wrapper captcha">
            <button type="button" onClick={generateCaptcha}>
              点击显示验证吗
            </button>
          </div>
        )}
        <button type="submit" className="login-button">
          登录
        </button>
        {message && <p className="message">{message}</p>}
        <div className="signup-container">
          <div className="signup-left">
            没有账户？<Link to="/register">注册</Link>
          </div>
          <div className="signup-right">
            忘记密码？<Link to="/ForgotPassword">找回</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
