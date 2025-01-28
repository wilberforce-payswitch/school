/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllStudentsUrl,
  getStudentByParentUrl,
  loginUrl,
} from "@/services/enpoints";
import { AdminResponse, AuthResponse, CreateClassResponse, ParentResponse, PayFeesProps, Payment, RegisterProps, SchoolClass, StudentProps, Students } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["SchoolClass", "Students", "StudentBalances"],
  endpoints: (build) => ({
    loginUser: build.mutation<
      AuthResponse,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: loginUrl,
        method: "POST",
        body: credentials,
      }),
    }),

    getSchoolClasses: build.query<SchoolClass[], void>({
      query: () => "classes",
      providesTags: ["SchoolClass"],
    }),
    getAllStudents: build.query<Students[], void>({
      query: () => "students",
      providesTags: ["Students"],
    }),
    getStudentsWithParent: build.query<Students[], { parentId: string }>({
      query: ({ parentId }) => `${getStudentByParentUrl}${parentId}`,
    }),
    getStudentPaymentHistory: build.query<Payment[], { studentId: string[] }>({
      query: ({ studentId }) => {
        const studentIdsParam = studentId.join(',');
        return  `${getAllStudentsUrl}/${studentIdsParam}/payments`},
    }),
    getStudentBalance: build.query<Payment[], { studentId: string[] }>({
      query: ({ studentId }) => {
        const studentIdsParam = studentId.join(',');
      return  `${getAllStudentsUrl}/${studentIdsParam}/balances`},
    }),
    getAllStudentsBalance: build.query<any[], void>({
      query: () => 'balances',
      providesTags: ['StudentBalances']
    }),
    makePayment: build.mutation<any[], PayFeesProps>({
      query: (payment) =>({
        url: 'payments',
        method: "POST",
        body: payment
      })
    }),
    registerParent: build.mutation<ParentResponse, RegisterProps>({
      query: (credentials) => ({
        url: "auth/register-parent",
        method: "POST",
        body: credentials
      }),
    }),
    registerAdmin: build.mutation<AdminResponse, RegisterProps>({
      query: (credentials) => ({
        url: "auth/register-admin",
        method: "POST",
        body: credentials
      }),
    }),
    createStudent: build.mutation<any[], StudentProps>({
      query: (payload) => ({
        url: "students",
        method: "POST",
        body: payload
      }),
    }),
    getStudentsInAClass: build.query<any[], {classId: string}>({
      query: ({classId}) => `students/class/${classId}`,
    }),
    createClass: build.mutation<CreateClassResponse, {name: string}>({
      query: (name) => ({
        url: 'classes',
        method: "POST",
        body: name
      }),
      invalidatesTags: ['SchoolClass']
    }),
    getTermsforAClass: build.query<any[], {class_uuid: string}>({
      query: ({class_uuid}) => `classes/${class_uuid}/terms`
    })
  }),
});

export const {
  useLoginUserMutation,
  useGetSchoolClassesQuery,
  useGetAllStudentsQuery,
  useGetStudentsWithParentQuery,
  useGetStudentPaymentHistoryQuery,
  useGetStudentBalanceQuery,
  useMakePaymentMutation,
  useRegisterParentMutation,
  useGetStudentsInAClassQuery,
  useGetAllStudentsBalanceQuery,
  useRegisterAdminMutation,
  useCreateStudentMutation,
  useCreateClassMutation,
  useGetTermsforAClassQuery
} = api;
