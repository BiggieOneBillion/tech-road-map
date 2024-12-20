import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import useQuiz from "../../hooks/useQuiz";
import { useNavigate } from "react-router-dom";
function Quiz() {
  const {
    questionOutput,
    questionModal,
    alertText,
    quizEndText,
    displayResponse,
    currentQuestion,
    currentQuestionIndex,
    selectedOption,
    handleNextQuestion,
    handleOptionChange,
  } = useQuiz();

  const navigate = useNavigate();

  useEffect(() => {
    if (!questionModal) {
      navigate(-1); // or return to the home page.
    }
  }, []);

  return (
    <div>
      {questionModal && (
        <div className="bg-[rgba(0,0,0,0.5)]y fixed h-[100vh] w-[100vw] top-0 flex items-center justify-center right-0">
          <div className="sm:h-[60vh]y h-[50vh] rounded-2xl w-[97vw] sm:max-w-[700px] bordery py-10">
            <p className="text-center py-1">
              Test Your progress From This Course{" "}
            </p>
            <div className="h-[45vh]y p-4">
              {questionOutput.length !== 0 ? (
                <div className="flex flex-col ">
                  <div className="border w-full  flex flex-col gap-10 rounded-[12px] p-[30px]">
                    <div className="space-y-6">
                      {/* congratulation text */}
                      {alertText && (
                        <p className="text-[#18A09A] text-base">
                          {alertText}😎🥳
                        </p>
                      )}
                      {/* quiz question */}
                      <p className="font-[500] text-[#1B1B1B] text-[16px] mb-1 flex items-start gap-2">
                        <span className="text-black">
                          {currentQuestionIndex + 1}.
                        </span>
                        {currentQuestion.question}
                      </p>
                      {/* quiz options */}
                      <ul>
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              id={`option-${index}`}
                              name="answer"
                              type="radio"
                              checked={selectedOption === option}
                              value={option}
                              onChange={() => handleOptionChange(option)}
                            />
                            <label
                              className="text-[#515151] text-[14px]  font-[500] "
                              htmlFor={`option-${index}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </ul>
                    </div>
                    <div className=" flex flex-col gap-1 ">
                      <p className="text-gray-600 text-sm">{displayResponse}</p>
                      <button
                        onClick={handleNextQuestion}
                        disabled={!selectedOption}
                        className="bg-[#18A09A] flex items-center justify-center text-[#FFFFFF] font-[600] text-[13px] px-5 py-2 rounded-sm w-[100px]y h-[40px]"
                      >
                        Next
                      </button>
                      <p className="text-black/80 text-sm">{quizEndText}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-red-600 text-[10px] flex items-center h-[30vh] justify-center flex-col">
                  <CircularProgress size={54} color="inherit" />
                </div>
              )}
            </div>
          </div>
          {/* go back button */}
          <button
            onClick={() => navigate(-1)}
            className="px-2 py-1 font-medium bg-black text-sm text-white absolute top-5 left-5"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
