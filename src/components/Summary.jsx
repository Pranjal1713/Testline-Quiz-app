const Summary = () => {
  const data = JSON.parse(localStorage.getItem("question-store"));
  const result = JSON.parse(localStorage.getItem("quiz-store"));

  if (!data || !result) return <p>Loading...</p>; // Handle missing data

  const questions = data.state.questions;
  const selected = result.state.selected;

  return (
    <div>

      <h1 className="text-center text-2xl mt-6">Summary Here...</h1>

      {questions &&
        questions.map((question, index) => (
          <div
            key={index}
            className="w-[400px] min-h-[400px] bg-blue-50 rounded-lg mx-auto mt-[6rem] shadow-lg p-4"
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
          </div>
        ))}
    </div>
  );
};

export default Summary;
