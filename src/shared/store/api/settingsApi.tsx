import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFolder, INewWord, INewWords } from "../slices/FolderSlice";
import { IDates, ISettings, IStory } from "../slices/UserSlice";
import { RootState } from "../../store"

//http://localhost:3000/users/669787b41e2ea369890f4f67/folders/0/words
const settingsApi = createApi({
  reducerPath: "settings",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_prodApiUrl+"settings/",
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
  tagTypes: ["User"],
  endpoints(builder) {
    return {
        updateSettings: builder.mutation({
            invalidatesTags: ["User"],
            query: (data:{updatedSettings: ISettings, userID: string}) => {
              return {
                url: `/${data.userID}/settings`,
                method: "PATCH",
                body: data.updatedSettings,
              };
            },
          }),
    };
  },
});

export const {
    useUpdateSettingsMutation
} = settingsApi;

export { settingsApi };
