import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
// import { convertToMDX } from "../../utils/utilFn";
// import MdxRenderer from "../mdx-react/mdx-rendenrer";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
// import { read } from "to-vfile";
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
                {/* {text} */}
                {/* <ReactMarkdown
                  components={{
                    code({ className, children, ...rest }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          PreTag="div"
                          language={match[1]}
                          style={dark}
                          {...rest}
                        >
                          {children}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {text}
                </ReactMarkdown> */}

                {/* <div className="mt-5">
                  {newResearchResponse.map((item) => (
                    <div key={item.key}>
                      {item.type === "heading" ? (
                        <h2 className="font-[900] text-center text-[18px] text-black mb-1">
                          {item.text}
                        </h2>
                      ) : item.type === "subheading" ? (
                        <h3 className=" p-1 text-start my-1 font-[600] bg-transparent text-[14px] ">
                          {item.text}
                        </h3>
                      ) : item.type === "boldText" ? (
                        <h3 className=" p-2  text-[15px] border-[3px] border-green-300">
                          {item.text}
                        </h3>
                      ) : (
                        <p className="text-[12px] font-[500]">{item.text}</p>
                      )}
                    </div>
                  ))}
                </div> */}
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
    </>
  );
};

export default LearningModal;
