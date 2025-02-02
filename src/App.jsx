import { useEffect } from "react";
import Quiz from "./components/Quiz";
import ResultPage from "./components/ResultPage";
import { SubmitStore, SummaryStore } from "./store/store";
import Summary from "./components/Summary";

function App() {
  const { submited, setIsSubmit } = SubmitStore();
  const {summary, setSummary} = SummaryStore()

  useEffect(() => {
    setIsSubmit(false);
    setSummary(false)
    // localStorage.removeItem("quiz-store");

  }, []);

  return (
    <>
      <div className="">
        <h1 className="font-bolder text-xl bg-purple-500 p-2 text-center">
          Quiz App
        </h1>
        {
        !summary && !submited && <Quiz /> 
        }
        {
          !summary && submited && <ResultPage />
        }
        {
          summary && submited && <Summary />
        }
      </div>
    </>
  );
}

export default App;
