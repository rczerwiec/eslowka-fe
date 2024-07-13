import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import {mainApi} from "./api/main";
import folderReducer from "./slices/FolderSlice";


export const store = configureStore({
  reducer: {
      [mainApi.reducerPath]: mainApi.reducer,
      folderProfile: folderReducer,
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

export {useFetchWordsQuery, useFetchFoldersQuery, useFetchSpecificWordsQuery} from "./api/main";