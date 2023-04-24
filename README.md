This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#构成
#/public: 静态文件。

#.js文件
##1) index.js;
##2) App.js：功能集成，初始界面会判断本地储存是否存储了用户数据，如果有，则会向后端验证后保持用户登录状态；
##3) /components/Button.js: 按钮设计；
##4) /components/Cards.js: 主页的卡片及其内容；
##5) /components/Footer.js: 页脚；
##6) /components/ForgotPassword.js: 登录界面的“忘记密码”功能(未做完)；
##7) /components/Galclass.js: 星系分类页面，调用了/components/glaclass/GalaxyCard.js & SeleCard.js，GalaxyCard.js管理左边图像模块，SeleCard.js管理右边用户分类选项模块(用了之前的版本，未加入正在修改的版本)；
##8) /components/Header.js: 主页标题；
##9) /components/HelloSection.js: 另一种风格的主页标题；
##10) /components/Login.js: 登录功能，基本逻辑注释在该文件开头；
##11) /components/Navbar.js: 导航栏；
##12) /components/Register.js: 注册功能；
##13) /components/UserContext,js: 它可以让你在组件树中传递数据，而不需要通过每个组件的props，这里UserContext的初始值是null，你可以在Provider组件中设置它的实际值；
##14) /components/funcmodels/SimpleCaptcha.js: 验证码，防止重复输入(暂定)；
##15) /components/GalaxyCard.js & SeleCard.js: 见7)；
##16) /components/pages/... .js：网页的各个页面(用户界面Private.js还没做)。

#.json文件: 当前react前端代码所需要的包列表。


