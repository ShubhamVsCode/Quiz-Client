import React from "react";
import { useParams } from "react-router-dom";
import { useGetAQuizQuery } from "../redux/features/user";

function Quiz() {
  const { quizId } = useParams();
  const quiz = useGetAQuizQuery(quizId);

  return <div>{quiz.data?.name}</div>;
}

export default Quiz;
