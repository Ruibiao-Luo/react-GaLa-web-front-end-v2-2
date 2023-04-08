import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SimpleCaptcha.css';

const SimpleCaptcha = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha(props));

  //刷新验证码
  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha(props));
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.toUpperCase() === captcha.text) {
      setCaptcha(generateCaptcha(props));
      props.onComplete(inputValue.toUpperCase());
      setInputValue('');
    }
  };

  return (
    <div className="simple-captcha">
      <img src={captcha.dataURL} alt="captcha" />
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="button" onClick={refreshCaptcha}>
        刷新
      </button>
      <button type="submit" onClick={handleSubmit}>
        验证
      </button>
    </div>
  );
};

//组件默认属性值
SimpleCaptcha.defaultProps = {
  chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  length: 6,
  onComplete: () => {},
};

//组件属性类型检查
SimpleCaptcha.propTypes = {
  chars: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  onComplete: PropTypes.func,
};

//生成验证码图片及字符内容
function generateCaptcha(props) {
  const canvas = document.createElement('canvas');
  canvas.width = 120;
  canvas.height = 50;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f7f7f7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const text = Array.from({ length: props.length })
    .map(() => props.chars[Math.floor(Math.random() * props.chars.length)])
    .join('');

  for (let i = 0; i < text.length; i++) {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(text[i], 20 + i * 20, 35);
  }

  return {
    dataURL: canvas.toDataURL(),
    text,
  };
}

export default SimpleCaptcha;
