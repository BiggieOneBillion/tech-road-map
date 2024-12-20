import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/global-context";
import { useNavigate } from "react-router-dom";

const useLearningRoadMap = () => {
  const {
    // responseGenarated,
    setSelectedLabel,
    callMoreResearch,
    newResearchResponse,
    setIsLableEmpty,
    // questionModal,
    setQuestionModal,
    handleGenerateQuestion,
  } = useContext(GlobalContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleQuestion = () => {
    handleGenerateQuestion();
    setQuestionModal(true);
    navigate("/quiz");
  };

  const handleNodeClick = (value) => {
    setIsLableEmpty(true);
    setSelectedLabel(value);
    setIsModalOpen(true);
    setLoading(true);
    callMoreResearch();

    // setIsModalOpen(true);
    // setLoading(true); // Start loading when a node is clicked
    // callMoreResearch();
  };

  useEffect(() => {
    if (newResearchResponse.length > 0) {
      setLoading(false); // Stop loading when data is received
    }
  }, [newResearchResponse]);
  return {
    isModalOpen,
    isLoading,
    handleNodeClick,
    handleQuestion,
    setIsModalOpen,
    newResearchResponse,
  };
};

export default useLearningRoadMap;
