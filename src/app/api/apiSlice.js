import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://votifyapi-q9zc.onrender.com/votify/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "User",
    "Election",
    "Ballot",
    "AddVoter",
    "Vote",
    "Result",
    "Profile",
    "Analytics",
    "Email",
  ],
  endpoints: (builder) => ({}),
});
