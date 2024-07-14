import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { INewWord, IWord } from "../slices/FolderSlice";
import { AnyARecord } from "dns";

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
        fetchSpecificWords: builder.query({
          providesTags: ["Words"],
          query: (folderID) => {
            return {
              url: `/words/getById/${folderID}`,
              method: "GET",
            }
          }
        }),
        createWord: builder.mutation({
          invalidatesTags: ["Words","Folders"],
          query: (newWord: INewWord) => {
            return {
              url: `/words/${newWord.folderID}`,
              method: "POST",
              body: newWord.word,
            };
          },
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

  export const {useFetchWordsQuery, useFetchFoldersQuery, useFetchSpecificWordsQuery, useCreateWordMutation} = mainApi;
  export {mainApi};