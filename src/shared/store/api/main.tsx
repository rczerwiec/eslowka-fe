import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFolder, INewWord, INewWords, IWord } from "../slices/FolderSlice";
import { AnyARecord } from "dns";
import { IUser } from "../slices/UserSlice";
import { isUpsertQuery } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { useSelector } from "react-redux";
//http://localhost:3000/users/669787b41e2ea369890f4f67/folders/0/words
const mainApi = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Words", "Folders"],
  endpoints(builder) {
    return {
      //CREATE USER============================================================
      createUser: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (newUser) => {
          return {
            url: `/users/signup`,
            method: "POST",
            body: newUser,
          };
        },
      }),
      //GETTERS============================================================
      fetchUser: builder.query({
        query: (userID: string) => {
          console.log();
          return {
            url: `/users/${userID}`,
            method: "GET",
          };
        },
      }),
      fetchSpecificWords: builder.query({
        providesTags: ["Words"],
        query: (data:{folderID: string, userID: string}) => {
          console.log();
          return {
            url: `/users/${data.userID}/folders/${data.folderID}/words`,
            method: "GET",
          };
        },
      }),
      fetchRandomWordsArray: builder.query({
        providesTags: ["Words"],
        query: (data:{folderID:string, userID: string}) => {
          return {
            url: `/users/${data.userID}/folders/${data.folderID}/randomWords`,
            method: "GET",
          };
        },
      }),
      fetchFolders: builder.query({
        providesTags: ["Folders"],
        query: (userID) => {
          console.log("fetching folders...");
          return {
            url: `/users/${userID}/folders/`,
            method: "GET",
          };
        },
      }),
      //PATCHERS============================================================
      createWord: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (data:{newWord: INewWord, userID: string}) => {
          return {
            url: `/users/${data.userID}/word`,
            method: "PATCH",
            body: data.newWord.word,
          };
        },
      }),
      createWords: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (data:{newWords: INewWords, userID: string}) => {
          return {
            url: `/users/${data.userID}/words`,
            method: "PATCH",
            body: data.newWords.words,
          };
        },
      }),
      updateWordStatus: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (data:{updatedWord: INewWord, userID: string}) => {
          return {
            url: `/users/${data.userID}/word/status`,
            method: "PATCH",
            body: data.updatedWord.word,
          };
        },
      }),
      removeWord: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (data:{wordToRemove: INewWord, userID: string}) => {
          return {
            url: `/users/${data.userID}/word`,
            method: "DELETE",
            body: data.wordToRemove.word,
          };
        },
      }),
      createFolder: builder.mutation({
        invalidatesTags: ["Folders"],
        query: (data:{newFolder: IFolder, userID: string}) => {
          return {
            url: `/users/${data.userID}/`,
            method: "PATCH",
            body: data.newFolder,
          };
        },
      }),
    };
  },
});

export const {
  useFetchFoldersQuery,
  useFetchUserQuery,
  useFetchSpecificWordsQuery,
  useCreateWordMutation,
  useRemoveWordMutation,
  useCreateFolderMutation,
  useCreateWordsMutation,
  useUpdateWordStatusMutation,
  useFetchRandomWordsArrayQuery,
  useCreateUserMutation
} = mainApi;
export { mainApi };
