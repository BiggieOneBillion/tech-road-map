import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/global-context";
import { useNavigate } from "react-router-dom";

const useQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const [displayResponse, setDisplayResponse] = useState("");
  const [alertText, setAlertText] = useState("");
  const [quizEndText, setQuizEndText] = useState("");
  const {
    // options,
    // handleGenerateQuestion,
    questionOutput,
    // newresharch,
    // selectedLabel,
    questionModal,
    // setQuestionModal,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.answer) {
      setDisplayResponse("Correct answer!");
      setTimeout(() => {
        if (currentQuestionIndex < questionOutput.length - 1) {
          // Increment question index for the next question
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setDisplayResponse(""); // Clear feedback message
        } else {
          // Final question completed
          setAlertText("Congratulations! You've completed the test.");
          setQuizEndText("Consider moving to the next level!");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
        setSelectedOption(null); // Reset selected option
      }, 1000);
    } else {
      setDisplayResponse("Incorrect answer. Try again.");
    }
  };

  const currentQuestion = questionOutput[currentQuestionIndex];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return {
    currentQuestionIndex,
    currentQuestion,
    questionOutput,
    questionModal,
    displayResponse,
    alertText,
    quizEndText,
    selectedOption,
    handleNextQuestion,
    handleOptionChange,
  };
};

export default useQuiz;
