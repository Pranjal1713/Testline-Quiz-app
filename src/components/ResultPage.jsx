import { SlBadge } from "react-icons/sl";
import { QuestionStore, QuizStore, SummaryStore } from "../store/store";
import { useEffect, useState } from "react";

const ResultPage = () => {
  const { questions } = QuestionStore();
  const { selected } = QuizStore();
  const {setSummary} = SummaryStore();

  const [accuracy, setAccuracy] = useState(0);
  const [correct, setCorrect] = useState(0);

  const Calculations = () => {
    let cnt = 0;
    questions.forEach((data, index) => {
      data.options.forEach((option) => {
        if (option.is_correct && option.description === selected[index]) {
          cnt += 1;
          setCorrect(cnt);
          // setCorrect((prev) => prev + 1);
          console.log(option.description);
          console.log(selected[index]);
        }
      });
    });
    setAccuracy((cnt * 100) / 10);
  };

  useEffect(() => {
    Calculations();
  }, []);

  return (
    <div className="w-[400px] h-[400px] bg-violet-700 rounded-lg mx-auto min-h-[400px] mt-[6rem] shadow-xl">
      <SlBadge className=" pt-5 mx-auto text-[5rem] text-white" />
      <h1 className="text-[1.7rem] text-center pt-4 text-white">
        Congratulations
      </h1>
      <h1 className="text-md text-center pt-2 text-white">Rank : #{12}</h1>
      <div className="flex px-[3rem] justify-center items-center text-center gap-4 mt-[2rem]">
        <div className=" w-[50%] bg-red-400 p-4 rounded-lg">
          <h1>
            {accuracy}% <br /> Accuracy
          </h1>
        </div>
        <div className="  w-[50%] bg-green-400 p-4 rounded-lg">
          {correct}.0 <br />
          Total Score
        </div>
      </div>
      <div className="flex px-[2.8rem] justify-around text-sm items-center text-white text-center gap-7 mt-[1.5rem]">
        <h1>Questions: 10</h1>
        <h1>Correct: {correct}</h1>
        <h1>Incorrect: {10 - correct}</h1>
      </div>
      <div onClick={() => setSummary(true)} className="py-2 px-3 w-[310px] mx-auto cursor-pointer text-white bg-violet-600 mt-3 rounded-lg text-center">
        Summary
      </div>
    </div>
  );
};

export default ResultPage;
