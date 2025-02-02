import ReactMarkdown from "react-markdown";

const Summary = () => {
  const data = JSON.parse(localStorage.getItem("question-store"));
  const result = JSON.parse(localStorage.getItem("quiz-store"));

  if (!data || !result) return <p>Loading...</p>; // Handle missing data

  const questions = data.state.questions;
  const selected = result.state.selected;

  return (
    <div>
      <h1 className="text-center text-2xl mt-6">Summary</h1>
      <hr className="border border-gray-300 w-[200px] mx-auto mt-2" />

      {questions &&
        questions.map((question, index) => (
          <div
            key={index}
            className="w-[600px] min-h-[400px] bg-blue-50 rounded-lg mx-auto mt-7 shadow-lg p-4"
          >
            <h1 className="text-lg mb-4">{question.description}</h1>

            {question?.options?.map((option, ind) => (
              <div
                key={option.id}
                className={`py-2 px-4 cursor-pointer shadow-md border border-gray-300 rounded-2xl w-[87%] mx-auto mb-3 
                    ${option.is_correct ? "bg-green-500" : ""}
                    ${
                      selected[index] === option.description
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

            <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-5 border border-gray-200">
              <h2 className="text-xl font-semibold mb-3">
                Detailed Explanation:
              </h2>
              <ReactMarkdown className="prose whitespace-pre-line">
                {question.detailed_solution}
              </ReactMarkdown>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Summary;
