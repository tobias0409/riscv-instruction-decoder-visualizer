import { useState, useEffect } from "react";
import heading from "./assets/heading.svg";
import {
  ChevronDownIcon,
  InformationCircleIcon,
  BackwardIcon,
  ForwardIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";
import { Instruction } from "../../core/Instruction.js"

export default function App() {
  type InputType = "hex" | "binary";

  const [inputType, setInputType] = useState<InputType>("hex");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const [instruction, setInstruction] = useState<Instruction | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isInputError, setInputError] = useState<boolean>(false);
 
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open) {
        if (e.key === "ArrowLeft") {
          setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
        } else if (e.key === "ArrowRight") {
          setCurrentStep((prevStep) => Math.min(prevStep + 1, instruction ? instruction.decodeSteps.length - 1 : 0));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, instruction?.decodeSteps.length]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\s/g, "");

    if (inputType === "hex") {
      if (value.match(/[^0-9a-f]/i) || value.length > 8) return;
    }

    if (inputType === "binary") {
      if (value.match(/[^01]/) || value.length > 32) return;
    }

    setInput(formatDisplayValue(value.toLocaleUpperCase()));
  };

  const formatDisplayValue = (value: string) => {
    return value.replace(/(.{4})/g, "$1 ").trim();
  };

  const validateInput = (input: string): boolean => {
    const inputWithoutSpaces = input.replace(/\s/g, "");

    if (inputType === "hex") {
      if (inputWithoutSpaces.length !== 8) {
        return false;
      }
    } else if (inputType === "binary") {
      if (inputWithoutSpaces.length !== 32) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <div className="flex flex-col items-center m-8 p-8 h-full">
        {/* heading */}
        <div className="w-full max-w-4xl">
          <img
            src={heading}
            alt="Heading"
            className="w-full h-full object-contain mix-blend-darken rounded-xl"
          />
        </div>

        {/* input area */}
        <div className="flex w-full mt-20 justify-center">
          <div className="w-full max-w-3xl">
            <label
              htmlFor="Input"
              className="block text-xl font-medium text-gray-900 font-bold"
            >
              Input
            </label>
            <div className="mt-2">
              <div
                className={`flex items-center rounded-md bg-white pl-4 outline outline-1 w-full ${
                  isInputError ? "outline-red-500" : "outline-gray-900"
                }`}
              >
                <div
                  className={`shrink-0 select-none text-xl font-bold ${
                    inputType === "hex" ? "text-gray-500" : "text-white"
                  }`}
                >
                  0x
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="block min-w-0 grow py-3 pl-3 pr-5 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
                {input.length > 0 && (
                  <button
                    onClick={() => {
                      setInputError(false);
                      setInput("");
                    }}
                    className="m-2 p-2 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-700" />
                  </button>
                )}
                <div className="grid shrink-0 grid-cols-1 relative">
                  <select
                    className="col-start-1 row-start-1 w-full appearance-none py-3 pl-4 pr-12 text-xl text-gray-600 placeholder:text-gray-400 focus:outline-none"
                    onChange={(e) => {
                      setInput("");
                      setInputType(e.target.value as InputType);
                    }}
                  >
                    <option value={"hex"}>Hex</option>
                    <option value={"binary"}>Binary</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-8 self-center justify-self-end text-gray-500"
                  />
                </div>
                <div className="grid shrink-0 grid-cols-1 relative">
                  <div className="col-start-1 row-start-1 w-full appearance-none rounded-r-md py-3 pl-4 pr-8 text-xl text-white bg-indigo-600">
                    <button
                      onClick={() => {
                        // validate input
                        if (!validateInput(input)) {
                          setInputError(true);
                          return;
                        }

                        setInputError(false);

                        // decode input 
                        try {
                          const instruction = new Instruction(`${inputType == "hex" ? "0x" : ""}${input.replace(/\s/g, "")}`, { ABI:true });
                          setInstruction(instruction);
                        } catch (e) {
                          console.error(e);
                          setInputError(true);
                          return;
                        }

                          // open modal
                        setOpen(true);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {isInputError && (
              <label className="mt-2 text-sm text-red-600">
                Please enter a valid {inputType === "hex" ? "hex" : "binary"}{" "}
                input
              </label>
            )}
          </div>
        </div>

        {/* output modal */}
        <Dialog
          open={open}
          onClose={(value) => {
            setOpen(value);
            setTimeout(() => {
              setCurrentStep(0);
            }, 300);
          }}
          className="relative z-10"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => {
                          setCurrentStep(0);
                        }, 300);
                      }}
                      className="inline-flex w-full justify-center items-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 sm:ml-3 sm:w-auto"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <InformationCircleIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-indigo-600"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <DialogTitle
                        as="h3"
                        className="text-2xl font-semibold text-gray-900"
                      >
                        {instruction?.decodeSteps[currentStep].title}
                      </DialogTitle>
                      <div className="flex flex-col mt-4 gap-4">
                        {
                          instruction?.decodeSteps[currentStep].sections.map((section, index) => (
                            <p key={index} className="text-xl text-gray-800" dangerouslySetInnerHTML={{ __html: section }} />
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {instruction && currentStep < instruction.decodeSteps.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="inline-flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    >
                      <ForwardIcon className="h-5 w-5" />
                    </button>
                  )}
                  {instruction && currentStep === instruction.decodeSteps.length - 1 && (
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => {
                          setCurrentStep(0);
                        }, 300);
                      }}
                      className="inline-flex w-full justify-center items-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 sm:ml-3 sm:w-auto"
                    >
                      Close
                    </button>
                  )}

                  {currentStep > 0 && (
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="inline-flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    >
                      <BackwardIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>

        <div className="flex flex-col items-center mt-auto">
          <p>
            Based on <a className="text-blue-700 font-bold" target="_blank" rel="noopener noreferrer" href="https://gitlab.com/luplab/rvcodecjs/">rvcodec</a> by luplap @ University of California, Davis | Made by Tobias Kathan for
            a seminar project at JKU
          </p>
        </div>
      </div>
    </div>
  );
}