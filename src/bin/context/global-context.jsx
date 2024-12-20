import { createContext, useEffect, useState } from "react";
import run from "../config/gemini";
// import run2 from "../config/gemini2";
import { useResultStore } from "../store/result-store";
export const GlobalContext = createContext(null);

const GlobalContextProvider = ({ children }) => {
  const [options, setOptions] = useState("");
  const [responseGenarated, setResponseGenarated] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [newresharch, setnewreshach] = useState("");
  const [newResearchResponse, setnewreshachResponse] = useState([]);
  const [islabelempty, setIsLableEmpty] = useState(false);
  const [questionOutput, setQuestion] = useState([]);
  const [questionModal, setQuestionModal] = useState(false);
  const setGeneratedResult = useResultStore(
    (state) => state.setGeneratedResult
  );

  const learning = `Generate detailed learning paths for a career ${options} specified by the user. Provide specific steps and explanations to cover each area required to succeed, structured as valid JSON without any additional text or formatting. The structure should look like this:

[{
"id":1,
  "Courses": "title",
  "Learn": ["learn 1 in very few words not higher than 15 words", "learn 2 in very few words not higher than 15 words"],
  "School": ["school 1", "school 2"],
  "Jobs": [
    "Jobs Websites",
    "Online Coding Communities",
    "Advice "
  ]
}]

Only return valid JSON without backticks, additional text, or formatting.`;

  const promptOutPut = `Generate  10 level questions for this topic ${selectedLabel}. Provide multiple-choice answer options for each question and clearly mark the correct answer. Return the response as an array of JSON objects with the following format for each question:

[
  {
    "question": "Your question here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Correct answer here"
  },
  {
    "question": "Your question here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Correct answer here"
  },
  ...
]

Only return valid JSON, without any additional text or formatting.`;

  const handleGenerateQuestion = async () => {
    const response = await run(promptOutPut);

    let newResponse = response.replaceAll(/```/g, "");
    const newResponse2 = newResponse.replaceAll("json", "");

    const FormatedResponse = JSON.parse(newResponse2);
    //  const FormatedResponseoutput = FormatedResponse.replace(/```/g, "").replace(/json/g, "").trim();

    setQuestion(FormatedResponse);
    console.log(typeof FormatedResponse);
  };

  // useEffect(() => {
  //   // Log newResearchResponse whenever it changes
  //   // console.log("Updated Research Response:", newResearchResponse);
  // }, [newResearchResponse]);

  const callresponse = async (prompt) => {
    const responseOutput = await run(learning);

    let newResponse = responseOutput.replaceAll(/`/g, "");
    const newResponse2 = newResponse.replaceAll("json", "");

    const FormatedResponse = JSON.parse(newResponse2);
    setResponseGenarated(FormatedResponse);
    setGeneratedResult(FormatedResponse); // update zustand store.
    setSelectedLabel("");
  };

  const sanitizeResponse = (response) => {
    return response
      .replace(/[`"'~**]/g, "") // Remove unwanted characters
      .split("\n") // Split response into lines
      .map((line, index) => {
        if (line.startsWith("##")) {
          return {
            type: "heading",
            text: line.replace(/##/g, "").trim(),
            key: index,
          };
        } else if (line.endsWith(":")) {
          return {
            type: "subheading",
            text: line.replace(/-/g, ""),
            key: index,
          };
        } else if (line.startsWith("**")) {
          // Check for lines with **
          return {
            type: "boldText",
            text: line.replace(/\*\*/g, "").trim(),
            key: index,
          };
        }
        return { type: "text", text: line.trim(), key: index };
      });
  };

  const callMoreResearch = async (prompt) => {
    if (selectedLabel) {
      // const newResearch = `Explain more about ${selectedLabel}. Explain in detail how ${selectedLabel} works and give examples. And return the result in a properly formatted mdx(markdown) format`;
      // console.log("Selected Label:", selectedLabel);
      // console.log("Research Prompt:", newResearch);
      // const newResearch = `Explain in detail how ${selectedLabel} works. Provide a comprehensive explanation along with clear examples. Please return the result in a properly formatted Markdown (MDX) structure, including appropriate headings, code blocks, and lists where necessary.`
      const newResearch = `Explain in detail how ${selectedLabel} works. Provide a comprehensive explanation along with clear examples. Ensure that the result is well-structured, with appropriate spacing for readability. Please return the result in a properly formatted Markdown (MDX) structure, including appropriate headings, code blocks, and lists where necessary, and make sure to leave sufficient line breaks between sections for easy reading.`;

      try {
        const callMoreResearchOutput = await run(newResearch);
        const newResponse = sanitizeResponse(callMoreResearchOutput);
        setnewreshachResponse(callMoreResearchOutput);
        // console.log("Research Output from context:", newResponse);
      } catch (error) {
        console.error("Error in callMoreResearch:", error);
      }
    } else {
      // console.warn("Selected label is empty, skipping research call.");
    }
  };

  useEffect(() => {
    if (selectedLabel) callMoreResearch();
  }, [selectedLabel]);

  return (
    <GlobalContext.Provider
      value={{
        options,
        setOptions,
        callresponse,
        responseGenarated,
        selectedLabel,
        setSelectedLabel,
        newresharch,
        callMoreResearch,
        newResearchResponse,
        setIsLableEmpty,
        handleGenerateQuestion,
        questionOutput,
        questionModal,
        setQuestionModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;