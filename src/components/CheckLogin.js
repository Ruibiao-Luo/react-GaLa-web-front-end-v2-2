import {Component} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import './CheckLogin.css';

@withRouter
class CheckLogin extends Component {
  componentDidMount() {
    // 获取当前的路径
    const publicList = ['/login','/register'];
    const pathname = this.props.location.pathname;
    // 如果是登录或注册页面，不需要检查登录状态
    if (publicList.indexOf(pathname)>-1) {
      return null;
    }
    // 否则，发送请求到后台接口，验证用户是否已经登录
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            // 如果已经登录，更新redux中的用户信息
            this.props.loadData(res.data.data);
          } else {
            // 如果没有登录，跳转到登录页面
            this.props.history.push('/login');
          }
        }
      })
  }

  render() {
    return (
    <div className="check-login-loading">正在验证登录状态...</div>
  );
  }
}

export default CheckLogin;