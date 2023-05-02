import React, { useEffect } from "react";
import { useGetAllQuizzesQuery } from "../redux/features/user";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addManyQuizzes, quizState } from "../redux/features/quiz";

function Dashboard() {
  // const quizzesFromRedux = useSelector(quizState);
  const allQuiz = useGetAllQuizzesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (allQuiz.isSuccess) {
      dispatch(addManyQuizzes(allQuiz.data));
    }
  }, [allQuiz]);

  return (
    <div className="py-10">
      <h1 className="text-5xl">All Quizzes</h1>

      {allQuiz.data?.map((quiz) => {
        return (
          <Link
            to={`/quiz/${quiz._id}`}
            key={quiz?._id}
            className="rounded-md flex flex-col group py-5 px-10 border border-white/20 duration-200"
          >
            <h2 className="text-3xl duration-200 group-hover:-translate-y-1 group-hover:scale-105">
              {quiz.name}
            </h2>

            {/* {quiz?.quizDate} */}
            {quiz?.level}
          </Link>
        );
      })}
    </div>
  );
}

export default Dashboard;
