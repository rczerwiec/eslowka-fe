import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const mainApi = createApi({
    reducerPath: "main",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://jsonplaceholder.typicode.com"
    }),
    tagTypes: [
    ],
    endpoints(builder) {
      return {}
    },
  });

  export {mainApi};