import React, { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { GlobalContext } from "../../context/global-context";
import FirstOutPut from "./FirstOutPut";
import OutPut3 from "./OutPut3";
import School from "./School";
import Resourses from "./Resourses";
import TopicSearched from "./TopicSearched";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import DisplayResponseContainer from "../../components/learning-path/display-response-container";

const nodeTypes = {
  firstOutPut: FirstOutPut,
  coursesdisplay: OutPut3,
  displayschool: School,
  resourses: Resourses,
  topic: TopicSearched,
  // Using the actual component for the node type
};

function LearningRoadMap() {
  const {
    responseGenarated,
    setSelectedLabel,
    callMoreResearch,
    newResearchResponse,
    setIsLableEmpty,
    questionModal,
    setQuestionModal,
    handleGenerateQuestion,
  } = useContext(GlobalContext);

  // console.log("Response Generated", responseGenarated);

  const [isModel, setIsModel] = useState(false);
  const [loading, setloading] = useState(false);

  // console.log(newResearchResponse);

  const navigate = useNavigate();

  const handleQuestion = () => {
    handleGenerateQuestion();
    setQuestionModal(true);
    navigate("/quiz");
  };

  const handleNodeClick = (value) => {
    setIsLableEmpty(true);
    setSelectedLabel(value);
    setIsModel(true);
    setloading(true);
    callMoreResearch();

    setIsModel(true);
    setloading(true); // Start loading when a node is clicked
    callMoreResearch();
  };

  useEffect(() => {
    if (newResearchResponse.length > 0) {
      setloading(false); // Stop loading when data is received
    }
  }, [newResearchResponse]);

  const getXPosition = () => {
    if (window.innerWidth > 1200) {
      return 500; // Position for larger screens
    } else if (window.innerWidth > 768) {
      return 800; // Position for medium screens
    } else {
      return 120; // Position for smaller screens
    }
  };

  const getXPositionSchool = () => {
    if (window.innerWidth > 1200) {
      return 1000; // Position for larger screens
    } else if (window.innerWidth > 768) {
      return 1000; // Position for medium screens
    } else {
      return 250; // Position for smaller screens
    }
  };

  // const Output = newResearchResponse[newResearchResponse.length - 1];

  const initialNodes = responseGenarated.flatMap((el, index) => [
    {
      id: `result-${10}`,
      type: "topic",
      data: {
        text: (
          <div>
            <p>Tech Road Map</p>
          </div>
        ),
      },
      position: { x: getXPosition(), y: -200 },
    },
    {
      id: `${el.id}`,
      type: "firstOutPut",
      data: { text: el.Courses, onClick: () => handleNodeClick(el.Courses) },
      position: { x: getXPosition(), y: 10 + index * 200 },
    },

    {
      id: `Learn-${el.id}`,
      type: "coursesdisplay",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.Learn[0])}>{el.Learn[0]}</p>
          </div>
        ),
      },
      position: { x: 1, y: 8 + index * 200 },
    },
    {
      id: `Learn2-${el.id}`,
      type: "coursesdisplay",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.Learn[1])}>{el.Learn[1]}</p>
          </div>
        ),
      },
      position: { x: 1, y: 70 + index * 200 },
    },
    {
      id: `Learn3-${el.id}`,
      type: "coursesdisplay",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.Learn[2])}>{el.Learn[2]}</p>
          </div>
        ),
      },
      position: { x: 1, y: 132 + index * 200 },
    },

    {
      id: `School1-${el.id}`,
      type: "displayschool",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.School[0])}>{el.School[0]}</p>
          </div>
        ),
      },
      position: { x: getXPositionSchool(), y: 5 + index * 200 },
    },
    {
      id: `School2-${el.id}`,
      type: "displayschool",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.School[1])}>{el.School[1]}</p>
          </div>
        ),
      },
      position: { x: getXPositionSchool(), y: 100 + index * 200 },
    },
    // {
    //   id: `Resourse1-${20}`,
    //   type: "resourses",
    //   data: {
    //     text: (
    //       <div>
    //         <p>Make Sure To Learn "Beginener " topics of all Tech Skills</p>
    //       </div>
    //     ),
    //   },
    //   position: { x: getXPositionSchool(), y: -200 },
    // },
  ]);

  const initialEdges = responseGenarated.flatMap((el) => [
    {
      id: `e-school1-${el.id}`,
      source: `${el.id}`,
      target: `School1-${el.id}`,
      animated: true,
    },
    {
      id: `e-school2-${el.id}`,
      source: `${el.id}`,
      target: `School2-${el.id}`,
      animated: true,
    },
    {
      id: `e-school3-${el.id}`,
      source: `${el.id}`,
      target: `School3-${el.id}`,
      animated: true,
    },
    {
      id: `Learn-${el.id}`,
      source: `Learn-${el.id}`,
      target: `${el.id}`,
      // animated: true,
    },
    {
      id: `Learn2-${el.id}`,
      source: `Learn2-${el.id}`,
      target: `${el.id}`,
      // animated: true,
    },
    {
      id: `Learn3-${el.id}`,
      source: `Learn3-${el.id}`,
      target: `${el.id}`,
      // animated: true,
    },
    // {
    //   id: `result-${10}`,
    //   source: `result-${10}`,
    //   target: `${0}`,
    //   // animated: true,
    // },
  ]);

  console.log(initialEdges);
  

  // const handleQUESTION =()=>{

  // }

  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="relative">
      <div className="h-screen flex flex-col  w-screen mb-24y bg-[#fffefe]">
        <div className="h-[10vh] px-10 sticky top-0 bg-[#0f172a] z-20 text-yellow-50 flex items-center justify-between  ">
          <p>Tech RoadMap</p>
          <a href="https://tech-quiz-gxmx.vercel.app/?vercelToolbarCode=1Iqfb5DbSiEhhQs">
            Take A Quiz
          </a>
        </div>
        <div className="h-[500px]y flex-1 overflow-auto w-[500px]y">
          <DisplayResponseContainer handleLearn={handleNodeClick} />
          {/* <ReactFlow
            className="w-full"
            nodes={initialNodes}
            edges={initialEdges}
            preventScrolling={false}
            // onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            panOnScroll={false}
            zoomOnScroll={false} // Prevents zooming with scroll
            zoomOnPinch={false} // Prevents zooming with pinch gestures
            fitView
          >
            <Controls />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow> */}
        </div>
        <div className=" bg-[#0f172a] flex justify-center items-center  h-fit py-10 w-[100vw] text-yellow-50">
          <div className="sm:h-fit px-2 sm:px-20 grid grid-cols-1 sm:grid-cols-2 w-full ">
            <div>
              <h2>RoadMap tech Genarator</h2>

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
      </div>

      {isModel && (
        <section className="h-[100vh] removescrollbar z-50 bg-black/50  fixed top-0 left-0 w-screen flex justify-end">
          <div className="h-[100vh] removescrollbar px-5 py-5 relative   overflow-y-scroll w-[100vw] sm:w-[40vw] shadow-lg bg-white">
            {!loading ? (
              <div>
                <button
                  onClick={() => setIsModel(false)}
                  className="right-5 h-[20px] p-2 py-3 top-4 absolute flex items-center justify-center  text-red-600 bg-red-100"
                >
                  <IoClose /> close
                </button>

                <div className="mt-5">
                  {newResearchResponse.map((item) => (
                    <div key={item.key}>
                      {item.type === "heading" ? (
                        <h2 className="font-[900] text-center text-[18px] text-black mb-1">
                          {item.text}
                        </h2>
                      ) : item.type === "subheading" ? (
                        <h3 className=" p-1 text-start my-1 font-[600] bg-transparent text-[12px] ">
                          {item.text}
                        </h3>
                      ) : item.type === "boldText" ? (
                        <h3 className=" p-2  text-[15px] border-[3px] border-green-300">
                          {item.text}
                        </h3>
                      ) : (
                        <p className="text-[11px] font-[500]">{item.text}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <p className="text-xs underline text-center text-wrap mb-1">
                    Feeling confident about your newly acquired knowledge? Then
                    take a quiz.
                  </p>
                  <button
                    onClick={handleQuestion}
                    className="bg-blue-600 text-[13px] w-full py-2 text-white rounded-md"
                  >
                    Take A Quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className=" flex items-center justify-center h-[100vh] bg-[rgba(0,0,0,0.1)]  ">
                <CircularProgress size={84} color="inherit" />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default LearningRoadMap;
