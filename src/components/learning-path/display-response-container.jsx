import React, { useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import { useResultStore } from "../../store/result-store";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const DisplayResponseContainer = ({ handleLearn }) => {
  const generatedResult = useResultStore((state) => state.generatedResult);
  const selectedTech = useResultStore((state) => state.selectedTech);

  const navigate = useNavigate();
  useEffect(() => {
    if (generatedResult.length === 0) {
      navigate(-1);
    }
  }, []);
  return (
    <div className="w-full pt-5 px-4 bg-white flex flex-col items-center gap-5">
      <h2 className="text-lg font-medium capitalize underline">
        Roadmap To Becoming A {selectedTech}
      </h2>
      <div className="mx-auto w-full max-w-4xl grid md:grid-cols-2 gap-4">
        {generatedResult.map((result, index) => (
          //   <section className="relative">
          <Disclosure
            as="div"
            className="p-6 border relative"
            defaultOpen={false}
            key={v4()}
          >
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
                {result.Courses}
              </span>
              <FaChevronDown className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className=" text-sm/5 text-black/50 absolute top-[80%] ml-3 w-full left-0 bg-white px-5 z-50 border">
              <section className="py-5 px-2 space-y-5">
                <div>
                  <h3 className="text-smfont-medium text-black">
                    Things to learn
                  </h3>
                  <p className="text-xs text-slate-500 underline">
                    Click on each of the lessons to take them.
                  </p>
                </div>
                <ul className="list-outside list-disc space-y-3">
                  {result.Learn.map((lesson) => (
                    <li key={v4()}>
                      <button
                        onClick={() => handleLearn(lesson)}
                        className="w-full px-2 py-1 border text-sm text-left rounded-md"
                      >
                        {lesson}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </DisclosurePanel>
          </Disclosure>
          //   </section>
        ))}
      </div>
    </div>
  );
};

export default DisplayResponseContainer;
