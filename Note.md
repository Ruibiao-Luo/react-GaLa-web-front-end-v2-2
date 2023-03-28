有几种方法可以添加后端地址到你的React代码, 例如：

1. 使用一个变量或常量来存储后端地址, 然后在Axios请求中使用它。例如:
// Replace with your own backend URL
const backendURL = 'https://example.com/api';

axios.post(backendURL + '/login', { username, password })
使用.env文件来存储后端地址, 然后在React代码中使用process.env.REACT_APP_前缀来访问它。例如:
// Create a .env file in your project root folder
// Add this line (replace with your own backend URL)
REACT_APP_BACKEND_URL=https://example.com/api

// In your React code, use process.env.REACT_APP_BACKEND_URL
axios.post(process.env.REACT_APP_BACKEND_URL + '/login', { username, password })
使用webpack或其他打包工具来定义后端地址作为一个全局变量, 然后在React代码中直接使用它。例如:
// In your webpack.config.js file, add this plugin
new webpack.DefinePlugin({
  BACKEND_URL: JSON.stringify('https://example.com/api')
})

// In your React code, use BACKEND_URL
axios.post(BACKEND_URL + '/login', { username, password })