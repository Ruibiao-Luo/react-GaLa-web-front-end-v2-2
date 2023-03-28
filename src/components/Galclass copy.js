import React, { useState } from 'react';
import GalaxyCard from './GalaxyCard';
import './Galclass.css';

function Galclass() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleSubmit = () => {
    // TODO: 处理提交逻辑
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src="/images/img-1.jpg" alt="galaxy" />
      </div>
      <div className="options-container">
        <div
          className={`option ${selected === 1 ? 'selected' : ''}`}
          onClick={() => handleSelect(1)}
        >
          <div className="option-circle" />
          <div className="option-text">椭圆星系</div>
        </div>
        <div
          className={`option ${selected === 2 ? 'selected' : ''}`}
          onClick={() => handleSelect(2)}
        >
          <div className="option-circle" />
          <div className="option-text">漩涡星系</div>
        </div>
        <div
          className={`option ${selected === 3 ? 'selected' : ''}`}
          onClick={() => handleSelect(3)}
        >
          <div className="option-circle" />
          <div className="option-text">盘星系</div>
        </div>
        <div
          className={`option ${selected === 4 ? 'selected' : ''}`}
          onClick={() => handleSelect(4)}
        >
          <div className="option-circle" />
          <div className="option-text">其它</div>
        </div>
        <div className="submit-container">
          
          <button className="submit-button" onClick={handleSubmit}>
            提交
          </button>
        </div>
      </div>
    </div>
  );
}

export default Galclass;