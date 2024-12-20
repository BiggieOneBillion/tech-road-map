import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import "./learning-modal.css";

const LearningModal = ({
  isModalOpen,
  setIsModalOpen,
  newResearchResponse,
  handleQuestion,
  isLoading,
}) => {

  const [text, setText] = useState("");

  useEffect(() => {
    if (newResearchResponse) {
      const fn = async () => {
        const file = await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process(newResearchResponse);
        return file;
      };

      fn()
        .then((file) => setText(String(file)))
        .catch((err) => console.log(err));
    }
  }, [newResearchResponse]);

  return (
    <>
      {isModalOpen && (
        <section className="h-[100vh] removescrollbar z-50 bg-black/50  fixed top-0 left-0 w-screen flex justify-end">
          <div className="h-[100vh] removescrollbar px-5 py-5 relative   overflow-y-scroll w-[100vw] sm:w-[40vw] shadow-lg bg-white">
            {!isLoading ? (
              <div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="right-5 h-[20px] p-2 py-3 top-4 absolute flex items-center justify-center  text-red-600 bg-red-100"
                >
                  <IoClose /> close
                </button>
                <div className="generated-response">
                  <div dangerouslySetInnerHTML={{ __html: text }} />
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
              <div className=" flex items-center justify-center h-[100vh] bg-[rgba(0,0,0,0.1)]y  ">
                <CircularProgress size={64} color="inherit" />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default LearningModal;
