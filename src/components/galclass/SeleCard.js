import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SeleCard.css";

const questions = [
  {
    id: 1,
    question: "中心星系的种类是什么？",
    options: [
      "椭圆星系",
      "旋涡星系",
      "盘星系",
      "不规则星系",
      "特异星系",
      "恒星/类星体/坏曝光/其它",
    ],
  },
  {
    id: 2,
    question: "这个星系有什么特殊特征吗?",
    options: [
      "引力透镜/弧状",
      "并合星系/潮汐扰动",
      "环星系/车轮星系/霍格天体",
      "低表面亮度星系/极弥散星系",
      "其它",
      "无特征",
    ],
  },
];

const SeleCard = () => {
  const history = useHistory();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill("")
  );
  const handleOptionClick = (option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = option;
    setSelectedOptions(newSelectedOptions);
  };
  const handleNextClick = () => {
    if (selectedOptions[currentQuestion] === "") {
      alert("Please select an option");
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit data here
      const formData = { answers: selectedOptions };
      console.log(formData); // Do whatever you want with the form data

      // Delay the redirect by one second
      setTimeout(() => {
        // Redirect to the next page
        history.push("/next-page");

        // Delay the redirect back to this page by one second
        setTimeout(() => {
          history.push("/galclass");
        }, 50);
      }, 50);
    }
  };

  const handlePrevClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="sele-card">
      <div className="question-section">
        <div className="question-text">
          {questions[currentQuestion].question}
        </div>
      </div>
      <div className="answer-section">
        {questions[currentQuestion].options.map((option) => (
          <button
            key={option}
            className={`answer-button ${
              selectedOptions[currentQuestion] === option ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="button-section">
        <button
          className="button-step"
          onClick={handlePrevClick}
          disabled={currentQuestion === 0}
        >
          上一步
        </button>
        <button className="button-step" onClick={handleNextClick}>
          {currentQuestion === questions.length - 1 ? "提交" : "下一步"}
        </button>
      </div>
    </div>
  );
};

export default SeleCard;
