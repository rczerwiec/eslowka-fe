import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFolder, INewWord, INewWords, IWord } from "../slices/FolderSlice";
import { AnyARecord } from "dns";
//http://localhost:3000/users/669787b41e2ea369890f4f67/folders/0/words
const mainApi = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Words", "Folders"],
  endpoints(builder) {
    return {
      fetchSpecificWords: builder.query({
        providesTags: ["Words"],
        query: (folderID) => {
          return {
            url: `/users/669787b41e2ea369890f4f67/folders/${folderID}/words`,
            method: "GET",
          };
        },
      }),
      fetchRandomWordsArray: builder.query({
        providesTags: ["Words"],
        query: (folderID) => {
          return {
            url: `/users/669787b41e2ea369890f4f67/folders/${folderID}/randomWords`,
            method: "GET",
          };
        },
      }),
      createWord: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (newWord: INewWord) => {
          return {
            url: `/users/669787b41e2ea369890f4f67/word`,
            method: "PATCH",
            body: newWord.word,
          };
        },
      }),
      createWords: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (newWords: INewWords) => {
          return {
            url: `/users/669787b41e2ea369890f4f67/words`,
            method: "PATCH",
            body: newWords.words,
          };
        },
      }),
      updateWordStatus: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (newWords: INewWord) => {
          return {
            url: `/users/669787b41e2ea369890f4f67/word/status`,
            method: "PATCH",
            body: newWords.word,
          };
        },
      }),
      removeWord: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (newWord: INewWord) => {
          return {
            url: `/users/669787b41e2ea369890f4f67/word`,
            method: "DELETE",
            body: newWord.word,
          };
        },
      }),
      createFolder: builder.mutation({
        invalidatesTags: ["Folders"],
        query: (newFolder: IFolder) => {
          return {
            url: `/users/669787b41e2ea369890f4f67/`,
            method: "PATCH",
            body: newFolder,
          };
        },
      }),
      fetchFolders: builder.query({
        providesTags: ["Folders"],
        query: () => {
          return {
            url: "/users/669787b41e2ea369890f4f67/folders/",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchFoldersQuery,
  useFetchSpecificWordsQuery,
  useCreateWordMutation,
  useRemoveWordMutation,
  useCreateFolderMutation,
  useCreateWordsMutation,
  useUpdateWordStatusMutation,
  useFetchRandomWordsArrayQuery,
} = mainApi;
export { mainApi };
