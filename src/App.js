import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import Private from "./components/pages/Private"
import { UserContext } from "./components/UserContext";
import Services from "./components/pages/Services";
import Products from "./components/pages/Products";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import Register from "./components/pages/Register";
import Galclass from "./components/pages/Galclass";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isVisited] = useState(
    localStorage.getItem("visited") === "true"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // 如果localStorage里面有token，则向后端发送验证token的请求
      axios
        .get("https://www.eeoaa.com:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // 设置当前用户为登录用户，并传递相应的权限到子组件
          setCurrentUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Navbar currentUser={currentUser} />
        <Switch>
          {isVisited ? null : (
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          )}
          <Route path="/home" exact>
            <Home currentUser={currentUser} />
          </Route>
          <Route path="/galclass" exact component={Galclass} />
          <Route path="/services" component={Services} />
          <Route path="/products" component={Products}>
            {!currentUser ? (
              <Redirect to="/login" />
            ) : (
              <Products currentUser={currentUser} />
            )}
          </Route>
          <Route path="/login" component={Login}>
            {!currentUser ? (
              <Login onLogin={(user) => setCurrentUser(user)} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/register" component={Register}>
            {!currentUser ? (
              <Register onRegister={(user) => setCurrentUser(user)} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
