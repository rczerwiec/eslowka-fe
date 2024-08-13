import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import {mainApi} from "./api/main";
import folderReducer from "./slices/FolderSlice";
import userReducer from "./slices/UserSlice";
import { useDispatch } from "react-redux";


export const store = configureStore({
  reducer: {
      [mainApi.reducerPath]: mainApi.reducer,
      folderProfile: folderReducer,
      userProfile: userReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
          mainApi.middleware,
      );
    },
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export {
  useUpdateUserSettingsMutation,
  useFetchUserQuery,
  useRemoveFolderMutation,
  useUpdateWordDetailsMutation,
  useCreateUserMutation,
  useFetchFoldersQuery,
  useFetchSpecificWordsQuery,
  useCreateWordMutation,
  useCreateFolderMutation,
  useRemoveWordMutation,
  useCreateWordsMutation,
  useUpdateWordStatusMutation,
  useFetchRandomWordsArrayQuery,
} from "./api/main";