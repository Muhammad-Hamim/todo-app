import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: "/tasks",
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),
    addTask: builder.mutation({
      query: (data) => {
        return {
          url: "/tasks",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;
