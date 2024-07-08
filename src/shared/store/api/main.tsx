import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const mainApi = createApi({
    reducerPath: "main",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000"
    }),
    tagTypes: [
      "Words",
    ],
    endpoints(builder) {
      return {
        fetchWords: builder.query({
          providesTags: ["Words"],
          query: () => {
            return {
              url: "/words",
              method: "GET",
            }
          }
        })
      }
    },
  });

  export const {useFetchWordsQuery} = mainApi;
  export {mainApi};