import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFolder, INewWord, INewWords } from "../slices/FolderSlice";
import { ISettings } from "../slices/UserSlice";
import { RootState } from "../../store"

//http://localhost:3000/users/669787b41e2ea369890f4f67/folders/0/words
const mainApi = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: async (headers, {getState}) => {
      const store  = await getState() as RootState;
      // console.log("myTOKEN",store.userProfile.token);
      // console.log("UID",store.userProfile.value);
      if (store) {
        headers.set('Authorization', `${store.userProfile.token}`)
      }
      return headers;
  }
  }),
  tagTypes: ["Words", "Folders", "User"],
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
        providesTags: ["User"],
        query: (userID: string) => {
          return {
            url: `/users/${userID}`,
            method: "GET",
          };
        },
      }),
      fetchUsers: builder.query({
        providesTags: ["User"],
        query: () => {
          return {
            url: `/users/`,
            method: "GET",
          };
        },
      }),
      fetchSpecificWords: builder.query({
        providesTags: ["Words"],
        query: (data:{folderID: string, userID: string}) => {
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
            body: {newWord: data.newWord.word, folderId: data.newWord.folderID},
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
      updateUserSettings: builder.mutation({
        invalidatesTags: ["User"],
        query: (data:{updatedSettings: ISettings, userID: string}) => {
          return {
            url: `/users/${data.userID}/settings`,
            method: "PATCH",
            body: data.updatedSettings,
          };
        },
      }),
      updateUserStats: builder.mutation({
        invalidatesTags: ["User"],
        query: (data:{experience: number, userID: string}) => {
          return {
            url: `/users/${data.userID}/userStatsUpdate`,
            method: "PATCH",
            body: {experience: data.experience},
          };
        },
      }),
      updateWordDetails: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (data:{updatedWord: INewWord, userID: string}) => {
          return {
            url: `/users/${data.userID}/word/details`,
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
      removeFolder: builder.mutation({
        invalidatesTags: ["Words", "Folders"],
        query: (data:{folderToRemove: IFolder, userID: string}) => {
          return {
            url: `/users/${data.userID}/folder`,
            method: "DELETE",
            body: data.folderToRemove,
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
  useCreateUserMutation,
  useUpdateWordDetailsMutation,
  useRemoveFolderMutation,
  useUpdateUserSettingsMutation,
  useUpdateUserStatsMutation,
  useFetchUsersQuery
} = mainApi;
export { mainApi };
