import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import "./Register.css";
import axios from "axios"; // 导入Axios库
//import qs from "qs";//导入qs库，用于格式化请求体,使用qs.stringify方法将对象转换为查询字符串,也可使用qs.parse方法将查询字符串转换为对象，用法在axios.post("/users/register",qs.stringify({username:zhong,...}))
import { useForm } from "react-hook-form"; // 导入React Hook Form库
import { useHistory } from "react-router-dom";
import * as yup from "yup"; // 导入Yup库
import { yupResolver } from "@hookform/resolvers/yup";

const axiosInstance = axios.create({
  baseURL: "https://www.eeoaa.com:8000",
  headers: {
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
const axiosInstanceVerify = axios.create({
  baseURL: "https://www.eeoaa.com:8000",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({
    username: "zhong",
    email: "1234@qq.com",
    password: "asdf",
    smsCode: "111111", // 用户填写的验证码
  }),
});
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { setCurrentUser } = useContext(UserContext);
  const history = useHistory();
  const [emailCode, setEmailCode] = useState(""); // 添加一个邮箱验证码状态
  const [showEmailCodeInput, setShowEmailCodeInput] = useState(false); // 添加一个是否显示邮箱验证码输入框的状态

  const onSubmit = async (data) => {
    try {
      // 发送注册请求前先向服务器发送验证码邮件，等待callback
      const response = await axiosInstance.post("/users/register", data);

      if (response.data.msg === "success") {
        // 如果发送验证码成功，则显示邮箱验证码输入框，并让用户输入验证码
        alert("验证码发送成功！");
        setShowEmailCodeInput(true);
      } else {
        alert("验证码发送失败，请重试！");
      }
    } catch (error) {
      console.error(error);
      alert("网络错误，请稍后再试。");
    }
  };

  const onEmailCodeSubmit = async (data) => {
    data.preventDefault();

    try {
      // 校验邮箱验证码是否正确
      const response = await axiosInstanceVerify.post("/users/smsCode", data);

      if (response.data.msg === "success") {
        // 验证码校验通过，允许用户进行注册或登录
        console.log(response.data);
        alert("注册成功！");
        setCurrentUser(response.data); // 将当前用户设置为已登录状态
        history.push("/home");
      } else {
        // 验证码校验失败，提示用户重新输入验证码
        alert(response.data.msg);
        setShowEmailCodeInput(true);
      }
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

      {showEmailCodeInput ? ( // 根据状态showEmailCodeInput来显示或隐藏邮箱验证码输入框
        <form onSubmit={onEmailCodeSubmit} style={{ marginTop: "30px" }}>
          <h1>邮箱验证码</h1>
          <div className="input-wrapper">
            <input
              placeholder="用户名"
              type="text"
              id="username"
              readOnly
              defaultValue={
                errors.username ? "" : document.getElementById("username").value
              }
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="邮箱"
              type="email"
              id="email"
              readOnly
              defaultValue={
                errors.email ? "" : document.getElementById("email").value
              }
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="密码"
              type="password"
              id="password"
              readOnly
              defaultValue={
                errors.password ? "" : document.getElementById("password").value
              }
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="邮箱验证码"
              type="text"
              id="emailCode"
              value={emailCode}
              onChange={(event) => setEmailCode(event.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            {" "}
            注册{" "}
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default Register;
