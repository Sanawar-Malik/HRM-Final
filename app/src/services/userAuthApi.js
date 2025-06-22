import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./localStorage";

export const userAuthapi = createApi({
  reducerPath: 'userAuthapi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    prepareHeaders: (headers) => {
      const { access_token } = getToken() || {};
      // console.log("access_token in profile", access_token);
      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'register/',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: 'login/',
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    profileUser: builder.query({
      query: () => ({
        url: 'profile/',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useProfileUserQuery,
} = userAuthapi;

