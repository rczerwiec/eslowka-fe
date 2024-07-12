import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import {mainApi} from "./api/main";
import wordsReducer from "./slices/WordsSlice";


export const store = configureStore({
  reducer: {
      [mainApi.reducerPath]: mainApi.reducer,
      words: wordsReducer,
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

export {useFetchWordsQuery, useFetchFoldersQuery} from "./api/main";