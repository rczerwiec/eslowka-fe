import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const mainApi = createApi({
    reducerPath: "main",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000"
    }),
    tagTypes: [
      "Words","Folders",
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
        }),
        fetchFolders: builder.query({
          providesTags: ["Folders"],
          query: () => {
            return {
              url: "/folders",
              method: "GET",
            }
          }
        })
      }
    },
  });

  export const {useFetchWordsQuery, useFetchFoldersQuery} = mainApi;
  export {mainApi};