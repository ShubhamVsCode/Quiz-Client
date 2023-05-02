import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      if (!state.quizzes.includes((q) => q?._id === action.payload?._id)) {
        state.quizzes.push(action.payload);
        console.log("Quiz Added in Store");
      } else {
        console.log("Quiz Already Exist in Store");
      }
    },
    addManyQuizzes: (state, action) => {
      const arrayOfQuizzes = action.payload;
      const filteredQuizzes = arrayOfQuizzes.filter(
        (quiz) => !state.quizzes.find((q) => q?._id === quiz?._id)
      );
      state.quizzes.push(...filteredQuizzes);
      console.log(
        filteredQuizzes.length > 0
          ? "Quizzes Added in Store"
          : "Quiz is Already Exist in Store"
      );
    },
    removeQuiz: (state, action) => {
      const filteredQuizzes = state.quizzes.filter(
        (q) => q._id !== action.payload
      );
      state.quizzes = filteredQuizzes;
    },
    clearAllQuizzes: (state) => {
      state.quizzes = [];
    },
  },
});

export const { addQuiz, addManyQuizzes, removeQuiz, clearAllQuizzes } =
  quizSlice.actions;
export const quizState = (state) => state.quizzes;
export default quizSlice.reducer;
