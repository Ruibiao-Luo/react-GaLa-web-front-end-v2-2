import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useForm } from "react-hook-form";
import { UserContext } from "./UserContext"; // 引入全局上下文组件
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// 创建一个Axios实例，设置基本的URL和头部
const axiosInstance = axios.create({
  baseURL: "https://www.eeoaa.com:8000",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({
    username: "zhong",
    password: "asdf",
  }),
});
// 创建一个表单数据的规则和约束
const schema = yup.object().shape({
  username: yup.string().required("用户名不能为空"),
  password: yup.string().required("密码不能为空"),
});

const Login = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  // 使用react-hook-form处理表单提交
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  //设置token过期时间
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  // 从全局上下文组件中获取用户数据状态和修改数据状态的方法
  const { setUser } = useContext(UserContext);
  // 设置登录状态，初始值为false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async (data) => {
    try {
      //const url = "https://www.eeoaa.com:8000/users/auth";
      const response = await axiosInstance.post("/users/auth", data);

      // 登录成功后，设置用户状态和权限信息，并保存到本地存储
      setUser({
        username: response.data.username,
        token: response.data.token,
        role: response.data.role,
      });
      // 设置token过期时间
      const expirationTime =
        new Date().getTime() + response.data.expiresIn * 1000;
      setTokenExpirationDate(expirationTime);
      // 保存到本地存储
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: response.data.username,
          token: response.data.token,
          expiresIn: response.data.expiresIn,
          expirationTime: expirationTime,
        })
      );
      //localStorage.setItem('token', response.data.token); // 保存到本地存储

      setMessage("登录成功！");
      history.goBack();
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        setMessage("用户名不存在");
      } else if (error.response.status === 401) {
        setMessage("密码错误");
      } else {
        setMessage("登录失败！");
      }
    }
  };
  const handleLogout = () => {
    // 清空localStorage中的currentUser数据
    localStorage.removeItem("currentUser");

    // 将当前用户设为空对象{}
    setUser({});

    // 设置已登录状态为false
    setIsLoggedIn(false);

    // 页面重定向到登录页面
    history.push("/login");
  };

  // 如果token已经过期，自动重新获取token并更新本地存储
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      tokenExpirationDate &&
      new Date().getTime() > tokenExpirationDate
    ) {
      axios
        .post("https://www.eeoaa.com:8000/users/refresh-token", null, {
          headers: { Authorization: `Bearer ${storedData.token}` },
        })
        .then((response) => {
          setUser({
            username: response.data.username,
            token: response.data.token,
            role: response.data.role,
          });

          const expirationTime =
            new Date().getTime() + response.data.expiresIn * 1000;
          setTokenExpirationDate(expirationTime);

          localStorage.setItem(
            "userData",
            JSON.stringify({
              username: response.data.username,
              token: response.data.token,
              expiresIn: response.data.expiresIn,
              expirationTime: expirationTime,
            })
          ); // 保存到本地存储
        });
    }
  }, [tokenExpirationDate, setUser]);

  return (
    <div className="login-container">
      {!isLoggedIn && (
        <>
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
        </>
      )}
      {isLoggedIn && (
        <div className="welcome-message">
          <h1>欢迎回来！</h1>
          <button onClick={handleLogout}>退出登录</button>
        </div>
      )}
    </div>
  );
};

export default Login;
