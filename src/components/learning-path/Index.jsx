import React from "react";
import LearningPathFooter from "./learning-path-footer";
import LearningPathHeader from "./learning-path-header";
import LearningModal from "./learning-modal";
import useLearningRoadMap from "../../hooks/useLearningRoadMap";
import DisplayResponseContainer from "./display-response-container";

function LearningRoadMap() {
  const {
    handleNodeClick,
    handleQuestion,
    isLoading,
    isModalOpen,
    newResearchResponse,
    setIsModalOpen,
  } = useLearningRoadMap();

  return (
    <div className="relative">
      <div className="h-screen flex flex-col w-screen bg-[#fffefe]">
        <LearningPathHeader />
        <div className="h-[500px]y flex-1 overflow-auto w-[500px]y">
          <DisplayResponseContainer handleLearn={handleNodeClick} />
        </div>
        <LearningPathFooter />
      </div>

      <LearningModal
        handleQuestion={handleQuestion}
        isModalOpen={isModalOpen}
        isLoading={isLoading}
        newResearchResponse={newResearchResponse}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default LearningRoadMap;
