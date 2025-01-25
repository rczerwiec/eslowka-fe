import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./api/usersApi";
import folderReducer from "./slices/FolderSlice";
import userReducer from "./slices/UserSlice";
import chatReducer from "./slices/ChatHistorySlice";
import { useDispatch } from "react-redux";
import { storiesApi } from "./api/storiesApi";
import { settingsApi } from "./api/settingsApi";
import { foldersApi } from "./api/folderApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [storiesApi.reducerPath]: storiesApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [foldersApi.reducerPath]: foldersApi.reducer,
    folderProfile: folderReducer,
    userProfile: userReducer,
    chatProfile: chatReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      usersApi.middleware,
      storiesApi.middleware,
      foldersApi.middleware,
      settingsApi.middleware,
    );
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export {
  useFetchUserQuery,
  useCreateUserMutation,
  useUpdateUserStatsMutation,
  useFetchUsersQuery,
  useUpdateUserDatesMutation,
  useUpdateUserInfoMutation,
} from "./api/usersApi";

export {
  useGetUserStoriesQuery,
  useCreateStoryMutation,
  useUpdateWordInStoryMutation,
  useDeleteStoryMutation,
} from "./api/storiesApi";

export { useUpdateSettingsMutation } from "./api/settingsApi";

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
  useDeleteUserFolderMutation,
} from "./api/folderApi";
