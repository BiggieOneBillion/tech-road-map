import React from "react";
import { CircularProgress } from "@mui/material";
import { Select } from "@headlessui/react";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa6";
import useInput from "../../hooks/useInput";
import { optionData, popularChoices } from "./home-data";


function Input() {
  const {
    buttonText,
    isLoading,
    loadingText,
    options,
    handleInput,
    handleSelectPopularChoice,
    handleSend,
  } = useInput();

  return (
    <>
      <main className="h-[100vh] bg-gray-50 flex items-center justify-center px-3 md:px-0">
        <section className="flex-col flex items-center justify-center gap-10">
          <header>
            <p className="text-xl md:text-3xl text-center">
              Welcome To Tech Road Map
            </p>
            <p className=" text-center text-black/80 text-sm sm:text-base">
              What Career in tech do you want to Search?
            </p>
          </header>
          <section>
            {isLoading && (
              <div className="text-black text-center text-sm mb-2">
                <p>{loadingText}</p>
              </div>
            )}

            <div className="flex items-center flex-col gap-4 w-full">
              <div className="relative">
                <Select
                  className={clsx(
                    " block w-[320px] md:w-[600px]  appearance-none rounded-lg border bg-white/5 py-3 px-3 text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    // Make the text of each option black on Windows
                    "*:text-black"
                  )}
                  value={options}
                  onChange={handleInput}
                >
                  <option value="">Select a Career</option>
                  {optionData.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </Select>
                <FaChevronDown
                  className="group pointer-events-none absolute top-[35%] right-2.5 size-4 fill-black/60"
                  aria-hidden="true"
                />
              </div>
              <section className="flex items-center flex-wrap md:flex-nowrap justify-center md:justify-start gap-3">
                {/* common choices */}
                {popularChoices.map((el) => (
                  <button
                    onClick={() => handleSelectPopularChoice(el)}
                    className="text-xs font-medium border rounded-lg px-2 py-1 bg-zinc-200"
                  >
                    {el}
                  </button>
                ))}
              </section>
              <button
                className="bg-black/100 mt-5 md:mt-0 text-white h-[2.5rem] w-[8em] items-center mx-auto  rounded-lg sm:w-[120px] flex justify-center"
                onClick={handleSend}
                disabled={isLoading}
              >
                {isLoading ? (
                  // Display the spinner inside the button
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  buttonText
                )}
              </button>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default Input;
