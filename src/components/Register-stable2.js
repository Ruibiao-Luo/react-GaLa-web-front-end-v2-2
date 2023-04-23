import React from  "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import "./Register.css";
import axios from "axios";// 导入Axios库
import { useForm } from "react-hook-form";// 导入React Hook Form库
import { useHistory } from "react-router-dom";
import * as yup from "yup";// 导入Yup库
import { yupResolver } from "@hookform/resolvers/yup";

// 创建一个Axios实例，设置基本的URL和头部
const axiosInstance = axios.create({
  baseURL: "https://www.eeoaa.com:8000",
  headers: {
    //"Content-Type": "application/x-www-form-urlencoded", // 使用表单格式
    "Content-Type": "application/json;charset=UTF-8",
    //"X-Content-Type-Options": "nosniff",
  },
  body: JSON.stringify({
    username: "zhong",
    password: "asdf",
    confirmedPassword: "asdf",
    email: "1234@qq.com",
    sex: "male",
  }),
});

// 创建一个表单数据的规则和约束
const schema = yup.object().shape({
  username: yup.string().required("用户名不能为空").min(6, "用户名至少6位"),
  password: yup.string().required("密码不能为空").min(8, "密码至少8位"),
  confirmedPassword: yup
    .string()
    .required("确认密码不能为空")
    .oneOf([yup.ref("password"), null], "两次密码不一致"),
  email: yup.string().required("邮箱不能为空").email("邮箱格式不正确"),
  sex: yup.string().required("性别不能为空"),
});

function Register() {
  // 使用useForm钩子来创建一个表单控制器，传入schema作为验证规则
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  
  // 使用useContext钩子来获取UserContext
  const { setCurrentUser } = useContext(UserContext);

  // 使用useHistory钩子来获取history对象
  const history = useHistory();


  // 定义一个提交表单的异步函数，使用async/await语法
  const onSubmit = async (data) => {
    //const {username}=data
    try {
      
      // 获取token和username
      //const token = localStorage.getItem("token");
      //const username = localStorage.getItem("username");

      // 把token和username添加到表单数据中
      //data.token = token;
      //data.username = username;

      // 使用Axios实例发送POST请求，传入表单数据
      const response = await axiosInstance.post(
        "/users/register",
        data
      );
      console.log(response.data);
      alert("注册成功！");// 在这里添加成功的提示信息
      setCurrentUser(response.data);// 将当前用户设置为已登录状态     
      // 页面重定向到主页
      history.push("/home");
    } catch (error) {
      console.error(error);
      alert("注册失败，请重试。");
    }
  };

  return (
    <div className="register-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>注册</h1>
        <div className="input-wrapper">
          <input
            placeholder="用户名"
            type="text"
            id="username"
            {...register("username")}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>
        <div className="input-wrapper">
          <input
            placeholder="密码"
            type="password"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div className="input-wrapper">
          <input
            placeholder="确认密码"
            type="password"
            id="confirmedPassword"
            {...register("confirmedPassword")}
          />
          {errors.confirmedPassword && (
            <p className="error">{errors.confirmedPassword.message}</p>
          )}
        </div>
        <div className="input-wrapper">
          <input
            placeholder="邮箱"
            type="email"
            id="email"
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="input-wrapper">
          <select title="性别" id="sex" {...register("sex")}>
            <option value="">性别</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
          {errors.sex && <p className="error">{errors.sex.message}</p>}
        </div>
        <button type="submit" className="login-button">
          {" "}
          注册{" "}
        </button>
      </form>
    </div>
  );
}
export default Register;
