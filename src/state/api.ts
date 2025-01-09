import { loginUrl } from "@/services/enpoints";
import { AuthResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8000/api/"}),
    reducerPath: "api",
    tagTypes: [],
    endpoints: (build) => ({
        loginUser: build.mutation<AuthResponse,{email: string, password: string}>({
            query: (credentials)=>({
                url: loginUrl,
                method: "POST",
                body: credentials
            })
        })
    })
})

export const {useLoginUserMutation} = api;