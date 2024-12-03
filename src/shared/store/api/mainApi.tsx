import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDates} from "../slices/UserSlice";
import { RootState } from ".."

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
  tagTypes: ["Words", "Folders", "User", "Stories"],
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
      //PATCHERS============================================================
      updateUserDates: builder.mutation({
        invalidatesTags: ["User"],
        query: (data:{datesToUpdate: IDates, userID: string}) => {
          return {
            url: `/users/${data.userID}/dates`,
            method: "PATCH",
            body: data.datesToUpdate,
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
      updateUserInfo: builder.mutation({
        invalidatesTags: ["User"],
        query: (data:{userName: string, userID: string}) => {
          return {
            url: `/users/${data.userID}/userInfo`,
            method: "PATCH",
            body: {userName: data.userName},
          };
        },
      }),
    };
  },
});

export const {
  useFetchUserQuery,
  useCreateUserMutation,
  useUpdateUserStatsMutation,
  useFetchUsersQuery,
  useUpdateUserDatesMutation,
  useUpdateUserInfoMutation,
} = mainApi;
export { mainApi };
