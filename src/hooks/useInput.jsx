import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadingPhrases } from "../components/home/home-data";
import { useResultStore } from "../store/result-store";
import { GlobalContext } from "../context/global-context";

const useInput = () => {
  const { options, setOptions, callresponse, responseGenarated } =
    useContext(GlobalContext);
  const [buttonText, setButtonText] = useState("Generate");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [counter, setCounter] = useState(0);

  const setSelectedTech = useResultStore((state) => state.setSelectedTech);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setOptions(e.target.value);
  };

  const handleSelectPopularChoice = (value) => setOptions(value);

  const handleSend = () => {
    if (options === "") return;
    setSelectedTech(options);
    setIsLoading(true);
    setCounter(0); // Reset counter when starting the loading
    setButtonText(loadingPhrases[0]); // Set initial button text
    callresponse();
    // setOptions("");
  };

  useEffect(() => {
    // Change loading text every 2 seconds
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingText(loadingPhrases[counter % loadingPhrases.length]);
        setCounter((prevCounter) => prevCounter + 1); // Update counter for next phrase
      }, 8000); // Update every 2 seconds

      return () => clearInterval(interval); // Clean up interval on unmount or when loading stops
    }
  }, [isLoading, counter, loadingPhrases]);

  useEffect(() => {
    if (responseGenarated.length > 0) {
      setIsLoading(false);
      setButtonText("Done");
      navigate("/search-result"); // Navigate when data is generated
    }
  }, [responseGenarated, navigate]);

  // Returned variables
  return {
    isLoading,
    loadingText,
    options,
    buttonText,
    handleInput,
    handleSelectPopularChoice,
    handleSend,
  };
};

export default useInput;
