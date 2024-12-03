import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import {mainApi} from "./api/mainApi";
import folderReducer from "./slices/FolderSlice";
import userReducer from "./slices/UserSlice";
import chatReducer from "./slices/ChatHistorySlice"
import { useDispatch } from "react-redux";
import { storiesApi } from "./api/storiesApi";
import { settingsApi } from "./api/settingsApi";
import { foldersApi } from "./api/folderApi";


export const store = configureStore({
  reducer: {
      [mainApi.reducerPath]: mainApi.reducer,
      [storiesApi.reducerPath]: storiesApi.reducer,
      [settingsApi.reducerPath]: settingsApi.reducer,
      [foldersApi.reducerPath]: foldersApi.reducer,
      folderProfile: folderReducer,
      userProfile: userReducer,
      chatProfile: chatReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
          mainApi.middleware,
          storiesApi.middleware,
          foldersApi.middleware,
      );
    },
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export {
  useFetchUserQuery,
  useCreateUserMutation,
  useUpdateUserStatsMutation,
  useFetchUsersQuery,
  useUpdateUserDatesMutation,
  useUpdateUserInfoMutation,
} from "./api/mainApi";

export {
  useGetUserStoriesQuery,
  useCreateStoryMutation,
  useUpdateWordInStoryMutation
} from "./api/storiesApi"

export {
  useUpdateSettingsMutation,
} from "./api/settingsApi";

export {
  useGetUserFoldersQuery,
  useGetFolderByReferenceCodeQuery,
  useGetSingleFolderQuery,
  useGetAllWordsInFolderQuery,
  useGetRandomFolderWordsQuery,
  useCreateFolderMutation,
  useCreateWordInFolderMutation,
  useCreateMultipleWordsInFolderMutation,
  useUpdateFolderDefaultVoiceMutation,
  useUpdateFolderSecondaryVoiceMutation,
  useUpdateFolderNameMutation,
  useUpdateWordDetailsMutation,
  useUpdateWordStatusAndStreakMutation,
  useDeleteWordInFolderMutation,
  useDeleteUserFolderMutation
} from "./api/folderApi"