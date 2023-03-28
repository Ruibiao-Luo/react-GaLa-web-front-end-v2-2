import React, { useState } from 'react';
import './SeleCard.css';

const Tab = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab('');
    } else {
      setActiveTab(tab);
    }
  };

  const handleSubmit = () => {
    console.log(`提交选项：${activeTab}`);
  };

  return (
    <div className="tab-container">
      <div className="tab-title">请选择星系种类：</div>
      <div className={`tab ${activeTab === '椭圆星系' ? 'active' : ''}`} onClick={() => handleTabClick('椭圆星系')}>
        <div className="tab-card">
          <div className="tab-card-label">1. 椭圆星系</div>
        </div>
      </div>
      <div className={`tab ${activeTab === '旋涡星系' ? 'active' : ''}`} onClick={() => handleTabClick('旋涡星系')}>
        <div className="tab-card">
          <div className="tab-card-label">2. 旋涡星系</div>
        </div>
      </div>
      <div className={`tab ${activeTab === '盘星系' ? 'active' : ''}`} onClick={() => handleTabClick('盘星系')}>
        <div className="tab-card">
          <div className="tab-card-label">3. 盘星系</div>
        </div>
      </div>
      <div className={`tab ${activeTab === '恒星' ? 'active' : ''}`} onClick={() => handleTabClick('恒星')}>
        <div className="tab-card">
          <div className="tab-card-label">4. 恒星/类星体/坏曝光</div>
        </div>
      </div>
      <div className={`tab ${activeTab === '其它' ? 'active' : ''}`} onClick={() => handleTabClick('其它')}>
        <div className="tab-card">
          <div className="tab-card-label">5. 其它</div>
        </div>
      </div>
      <button className="submit-button" onClick={handleSubmit}>提交</button>
    </div>
  );
};

export default Tab;