import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFolder, INewWord, INewWords } from "../slices/FolderSlice";
import { IDates, ISettings, IStory } from "../slices/UserSlice";
import { RootState } from "../../store"

//http://localhost:3000/users/669787b41e2ea369890f4f67/folders/0/words
const storiesApi = createApi({
  reducerPath: "stories",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_testApiUrl+"stories/",
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
  tagTypes: ["Words", "Folders", "User", "Stories"],
  endpoints(builder) {
    return {
      getUserStories: builder.query({
        providesTags: ["Stories"],
        query: (userID: string) => {
          return {
            url: `/${userID}/stories`,
            method: "GET",
          };
        },
      }),
      //PATCHERS============================================================
      updateWordInStory: builder.mutation({
        invalidatesTags: ["Words", "Folders","Stories"],
        query: (data:{storyID: number, storyWordID: number, userID: string, word: { id: number; word: string; known: number }}) => {
          return {
            url: `/${data.userID}/story/${data.storyID}/${data.storyWordID}`,
            method: "PATCH",
            body: data.word,
          };
        },
      }),
      deleteStory: builder.mutation({
        invalidatesTags: ["Stories"],
        query: (data:{storyToRemove: IStory, userID: string}) => {
          return {
            url: `/${data.userID}/story`,
            method: "DELETE",
            body: data.storyToRemove,
          };
        },
      }),
      createStory: builder.mutation({
        invalidatesTags: ["Stories"],
        query: (data:{newStory: IStory, userID: string}) => {
          return {
            url: `/${data.userID}/story`,
            method: "PATCH",
            body: data.newStory,
          };
        },
      }),
    };
  },
});

export const {
  useGetUserStoriesQuery,
  useCreateStoryMutation,
  useUpdateWordInStoryMutation,
  useDeleteStoryMutation
} = storiesApi;

export { storiesApi };
