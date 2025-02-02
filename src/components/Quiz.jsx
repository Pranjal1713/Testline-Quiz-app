import axios from "axios";
import { useState, useEffect } from "react";
import { QuestionStore, QuizStore, SubmitStore } from "../store/store";

// const api = import.meta.env.VITE_API;
// const api = "https://api.jsonserve.com/Uw5CrX";
const API_URL = "/api/Uw5CrX";

const Quiz = () => {
  const { selected, addOption } = QuizStore();
  const { setIsSubmit } = SubmitStore();

  const [question, setQuestion] = useState();
  const [curr, setCurr] = useState(1);

  const { questions, addQuestion } = QuestionStore();

  // console.log(questions[0]);
  // const [loading, setLoading] = useState(true);

  const fetchApi = async (url) => {
    if (!questions || questions.length === 0) {
      try {
        const res = await axios.get(url);
        const result = res.data.questions;
        console.log(result);
        addQuestion(result);
        setQuestion(result[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      setQuestion(questions[curr - 1]);
    }
  };

  useEffect(() => {
    fetchApi(API_URL);
  }, []);

  const onNext = () => {
    if (curr + 1 <= questions.length) {
      setQuestion(questions[curr]);
      setCurr((prev) => prev + 1);
    }
  };
  const onPrevious = () => {
    if (curr - 2 >= 0) {
      setQuestion(questions[curr - 2]);
      setCurr((prev) => prev - 1);
    }
  };

  const handleSelection = (option, index) => {
    if (curr - 1 >= 0 && selected[curr - 1] === undefined) {
      addOption(option, index);
    }
  };

  return (
    <>
      <div>
        {question && (
          <div className="w-[400px] min-h-[400px] bg-blue-50 rounded-lg mx-auto mt-[6rem] shadow-lg">
            <h1 className="pt-4 px-[2rem] text-lg mb-8">
              {question.description}
            </h1>

            {question?.options?.map((option, ind) => (
              <div
                key={option.id}
                onClick={() => handleSelection(option, curr - 1)}
                className={` py-2 px-4  cursor-pointer shadow-md border border-gray-300 rounded-2xl w-[87%] mx-auto mb-3 
                ${
                  selected[curr - 1] !== undefined && option.is_correct
                    ? "bg-green-500"
                    : ""
                }
                ${
                  selected[curr - 1] === option.description
                    ? option.is_correct
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "active:bg-blue-200"
                }
                
                    
                    `}
              >
                {ind + 1}. {option.description}
              </div>
            ))}

            <div className="px-5 w-full flex justify-between items-center mt-10 mb-5">
              <button
                className="border border-gray-300 px-4 py-2 mb-5 rounded-3xl bg-blue-300 hover:bg-blue-400"
                onClick={onPrevious}
              >
                Previous
              </button>
              <h1 className=" text-center mb-5">{curr}/10 </h1>
              {curr === questions.length ? (
                <button
                  className="border border-gray-300 px-4 py-2 mb-5 rounded-3xl bg-blue-300 hover:bg-blue-400"
                  onClick={() => setIsSubmit(true)}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="border border-gray-300 px-4 py-2 mb-5 rounded-3xl bg-blue-300 hover:bg-blue-400"
                  onClick={onNext}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
