import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../utils/constant";

export const userApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    checkToken: builder.mutation({
      query: (token) => ({
        url: "/user/checktoken",
        body: { token },
        method: "POST",
      }),
    }),
    getProfile: builder.mutation({
      query: () => `/user/getUser`,
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        body: data,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        body: data,
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),

    getUpcomingQuizzes: builder.query({
      query: () => ({
        url: "/quiz/upcoming",
      }),
    }),

    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/question",
        body: data,
        method: "POST",
      }),
    }),
    updateQuestion: builder.mutation({
      query: (data) => ({
        url: `/question/${data?._id}`,
        body: data,
        method: "PUT",
      }),
    }),

    updateOption: builder.mutation({
      query: (data) => ({
        url: `/option/${data?._id}`,
        body: data,
        method: "PUT",
      }),
    }),

    createQuiz: builder.mutation({
      query: (data) => ({
        url: "/quiz",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCheckTokenMutation,
  useGetProfileMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,

  useGetUpcomingQuizzesQuery,

  useCreateQuestionMutation,
  useUpdateQuestionMutation,

  useUpdateOptionMutation,
  useCreateQuizMutation,
} = userApi;
