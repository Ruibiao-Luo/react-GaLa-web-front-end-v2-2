import React from "react";
import { Redirect } from "react-router-dom";

function Private() {
  // 检查当前用户是否已经通过身份验证
  const isAuthenticated = true; // 这里你可以使用useState来代替

  if (!isAuthenticated) {
    // 如果用户未通过身份验证，则返回到主页
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>欢迎进入私有页面</h1>
      <p>只有授权用户才能看到这个页面。</p>
    </div>
  );
}

export default Private;
