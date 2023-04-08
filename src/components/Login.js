import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useForm } from "react-hook-form";

const Login = () => {
  const history = useHistory();
  
  // 使用useState来管理消息状态，每当用户登录成功或失败时设置相应消息
  const [message, setMessage] = useState("");
  
  // 注册和处理表单逻辑的方法，使用useForm hook来代替手动设置状态值 
  const { register, handleSubmit } = useForm();

  // 提交表单时的方法
  const onSubmit = async (data) => {
    try {
      const url = "https://www.eeoaa.com:8000/users/auth";
      const response = await axios.post(url, data);
      
      // 把token存储到localStorage中
      localStorage.setItem('token', response.data.token);
      
      // 设置登录成功的消息并且回到之前的页面
      setMessage("登录成功！");
      history.goBack(); 
      
    } catch (error) {
      console.log(error);
      
      // 设置登录失败的消息
      setMessage("登录失败！");
    }
  };

  return (
    <div className="login-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>登录</h1>

        <div className="input-wrapper">
          {/* 注册用户名字段，并添加必填选项 */}
          <input type="text" placeholder="请输入用户名" id="username" {...register("username", { required: true })} />
          <label htmlFor="username"></label>
        </div>

        <div className="input-wrapper">
          {/* 注册密码字段，并添加必填选项 */}
          <input type="password" placeholder="请输入密码" id="password" {...register("password", { required: true })} />
          <label htmlFor="password"></label>
        </div>

        <button type="submit" className="login-button"> 登录 </button>

        {/* 如果有消息需要显示，则显示消息 */}
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
}

export default Login;
