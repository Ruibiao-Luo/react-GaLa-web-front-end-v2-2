import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useForm } from "react-hook-form";
import { UserContext } from "./UserContext";// 引入全局上下文组件
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// 封装一个处理请求的函数
const sendRequest = async (url, requestBody) => {
  try {
    const response = await axios.post(url, requestBody);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 配置axios实例，使用拦截器处理请求头和响应结果
const axiosInstance = axios.create({
  baseURL: "https://www.eeoaa.com:8000",
});

axiosInstance.interceptors.request.use(config => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
    config.headers['Authorization'] = `Bearer ${currentUser.token}`;
  }
  return config;
})

axiosInstance.interceptors.response.use(response => {
  if (response.data.error) {
    throw response.data.error;
  }
  return response.data;
}, error => {
  if (error.message === 'Network Error') {
    throw new Error('无法连接到服务器');
  }
  throw error;
});

// 创建一个表单数据的规则和约束
const schema = yup.object().shape({
  username: yup.string().required("用户名不能为空"),
  password: yup.string().required("密码不能为空"),
});

const Login = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });// 使用react-hook-form处理表单提交
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null); //设置token过期时间  
  const { setUser } = useContext(UserContext);// 从全局上下文组件中获取用户数据状态和修改数据状态的方法
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async (data) => {
    const requestBody = {
      username: data.username,
      password: data.password
    };
      
    try {
      const url = "/users/auth";
      const response = await sendRequest(url, requestBody);
      setUser({ 
          username: response.username, 
          token: response.token, 
          role: response.role 
      });
      // 设置token过期时间
      const expirationTime =
        new Date().getTime() + response.data.expiresIn * 1000;
      setTokenExpirationDate(expirationTime);
      setIsLoggedIn(true);
      // 保存当前用户信息到localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        username: response.username,
        token: response.token,
        expiresIn: response.data.expiresIn,
        expirationTime: expirationTime,
      }));

      setMessage("登录成功！");
      history.push("/");
    } catch (error) {
      console.log(error);
      if (error === '无法连接到服务器') {
        setMessage(error);
      } else if (error.message === 'Unauthorized') {
        setMessage("用户名或密码错误");
      } else {
        setMessage("登录失败！");
      }
    }
  };
  
  //用来检测本地储存中是否有有效的 token，若有则设置登录状态及过期时间
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const currentTime = new Date().getTime();
      if (currentTime < currentUser.expirationTime) {
        setIsLoggedIn(true);// 设置用户状态为已登录
        setTokenExpirationDate(currentUser.expirationTime);
      } else {
        localStorage.removeItem('currentUser');//否则移除用户信息
      }
    }
  }, []);
  
  // 添加定时器逻辑，每分钟去检查当前 token 是否已经过期，若过期则移除此无效 token 并清空其他状态
  useEffect(() => {
    const interval = setInterval(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        const currentTime = new Date().getTime();
        if (currentTime > currentUser.expirationTime) {
          clearInterval(interval);
          localStorage.removeItem('currentUser');
          setIsLoggedIn(false);
          setTokenExpirationDate(null);
        }
      }
    }, 1000 * 60); //每分钟检查一次
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");// 删除localStorage中的currentUser数据
    setUser({});// 设置用户状态为空对象{}
    setIsLoggedIn(false);// 设置已登录状态为false
    history.push("/login");// 页面重定向到登录页面
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
      axiosInstance
        .post("/users/refresh-token", null, {
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
                {...register("username")}
              />
              {errors.username && 
                <p className="error-message">{errors.username.message}</p>
              }
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="请输入密码"
                {...register("password")}
              />
              {errors.password && 
                <p className="error-message">{errors.password.message}</p>
              }
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
