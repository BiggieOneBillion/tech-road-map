import React from "react";

const LearningPathFooter = () => {
  return (
    <div className=" bg-[#0f172a] flex justify-center items-center  h-fit py-10 w-[100vw] text-yellow-50">
      <div className="sm:h-fit px-2 sm:px-20 grid grid-cols-1 sm:grid-cols-2 w-full ">
        <div>
          <h2 >RoadMap tech Genarator</h2>

          <p className="text-sm text-white/70 mt-4">
            {" "}
            Community created roadmaps, best practices, projects,
          </p>
          <p className="text-sm text-white/70">
            articles, resources and journeys to help you choose your
          </p>
          <p className="text-sm text-white/70">
            {" "}
            path and grow in your career.
          </p>
        </div>
        <div className="flex flex-col justify-end">
          <h2 className="sm:text-end text-sm">
            @LinkedIn <a href="">Raymond Chukwu Chinwendu</a>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LearningPathFooter;
