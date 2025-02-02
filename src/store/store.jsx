import { create } from "zustand";
import { persist } from "zustand/middleware";

export const QuizStore = create(
    persist(
  (set) => ({
    selected: [],

    addOption: (option, index) =>
      set((state) => {
        const newSelected = [...state.selected]; // Create a copy of the array
        newSelected[index] = option.description; // Update the copy
        return { selected: newSelected }; // Return the new array
      }),
  }),
  {
    name: "quiz-store",
  }
    )
);

export const SubmitStore = create(
  persist(
    (set) => ({
      submited: false,
      setIsSubmit: (val) => set({ submited: val }),
    }),
    {
      name: "submit-store", // Name for the persisted store
    }
  )
);

export const SummaryStore = create(
  persist(
    (set) => ({
      summary: false,
      setSummary: (val) => set({ summary: val }),
    }),
    {
      name: "summary-store", // Name for the persisted store
    }
  )
);

export const QuestionStore = create(
  persist((set) => ({
    questions: [],

    addQuestion: (data) => set({ questions: data }),
  }),{
    name: "question-store",
  })
);
