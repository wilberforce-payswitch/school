/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllStudentsUrl,
  getStudentByParentUrl,
  loginUrl,
} from "@/services/enpoints";
import {
  AdminResponse,
  AuthResponse,
  ClassFeeProp,
  CreateClassResponse,
  OtpProps,
  ParentResponse,
  PayFeesProps,
  Payment,
  PaymentData,
  paymentStatusStatistics,
  RegisterProps,
  School,
  SchoolClass,
  SchoolRequestProps,
  StatisticsProps,
  StudentProps,
  Students,
} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    credentials: "include", 
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
        credentials: "include",
      }),
    }),

    getSchoolClasses: build.query<SchoolClass[], {school_id: string}>({
      query: ({school_id}) => `classes/${school_id}`,
      providesTags: ["SchoolClass"],
    }),
    getAllStudents: build.query<Students[], void>({
      query: () => "students",
      providesTags: ["Students"],
    }),
    getStudentsWithParent: build.query<Students[], { parentId: string }>({
      query: ({ parentId }) => `${getStudentByParentUrl}${parentId}`,
    }),
    getStudentPaymentHistory: build.query<PaymentResponse, { studentId: string[], search:string, page: number  }>({
      query: ({ studentId, search, page }) => {
        let queryParams = `page=${page}`;
        if (search && search.trim() !== ''){
          queryParams += `&search=${encodeURIComponent(search)}`
        }
        const studentIdsParam = studentId.join(",");
        return `${getAllStudentsUrl}/${studentIdsParam}/payments?${queryParams}`;
      },
    }),
    getStudentBalance: build.query<Payment[], { studentId: string[] }>({
      query: ({ studentId }) => {
        const studentIdsParam = studentId.join(",");
        return `${getAllStudentsUrl}/${studentIdsParam}/balances`;
      },
    }),
    getAllStudentsBalance: build.query<any[], void>({
      query: () => "balances",
      providesTags: ["StudentBalances"],
    }),
    makePayment: build.mutation<any[], PayFeesProps>({
      query: (payment) => ({
        url: "payments",
        method: "POST",
        body: payment,
      }),
    }),
    registerParent: build.mutation<ParentResponse, RegisterProps>({
      query: (credentials) => ({
        url: "register-parent",
        method: "POST",
        body: credentials,
      }),
    }),
    registerAdmin: build.mutation<AdminResponse, RegisterProps>({
      query: (credentials) => ({
        url: "register-admin",
        method: "POST",
        body: credentials,
      }),
    }),
    createStudent: build.mutation<any[], StudentProps>({
      query: (payload) => ({
        url: "students",
        method: "POST",
        body: payload,
      }),
    }),
    getStudentsInAClass: build.query<any[], { classId: string }>({
      query: ({ classId }) => `students/class/${classId}`,
    }),
    createClass: build.mutation<CreateClassResponse, { name: string, school_id: string | undefined }>({
      query: (data) => ({
        url: "classes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SchoolClass"],
    }),
    getTermsforAClass: build.query<any[], { school_id: string }>({
      query: ({ school_id }) => `classes/${school_id}/terms`,
    }),
    getSchoolStatistics: build.query<
      StatisticsProps,
      { school_id: string | undefined }
    >({
      query: ({ school_id }) => `schools/${school_id}`,
    }),
    getTotalPaymentStatusStatistics: build.query<paymentStatusStatistics, void>(
      {
        query: () => `payments/summary`,
      }
    ),
    getAllSchools: build.query<School[], void>({
      query: () => "schools",
    }),
    getSchoolPaymentData: build.query<PaymentData[], void>({
      query: () => "payments/data",
    }),
    verifyOtp: build.mutation<any[], OtpProps>({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: build.mutation<
      any,
      {
        old_password: string;
        new_password: string;
        new_password_confirmation: string;
      }
    >({
      query: (data) => ({
        url: "/change-password",
        method: "PUT",
        body: data,
      }),
    }),
    createSchool: build.mutation<School, SchoolRequestProps>({
      query: (data) => ({
        url: "schools/create-school",
        method: "POST",
        body: data,
      }),
    }),
    createClassFees: build.mutation<any, ClassFeeProp>({
      query: (data) => ({
        url: "create-fees",
        method: "POST",
        body: data,
      }),
    }),
    academicYear : build.query<any[], void>({
      query: () => "academic-year",
    }),
    getSchoolTransactionHistory: build.query<any[], { school_id: string | undefined, search: string, page: number}>({
      query: ({ school_id, page, search }) => {
        let queryParams = `page=${page}`;
        if (search && search.trim() !== '') {
          queryParams += `&search=${encodeURIComponent(search)}`;
        }
        return `payments/school-payment-data/${school_id}?${queryParams}`;
      }
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
  useGetTermsforAClassQuery,
  useGetSchoolStatisticsQuery,
  useGetTotalPaymentStatusStatisticsQuery,
  useGetAllSchoolsQuery,
  useGetSchoolPaymentDataQuery,
  useVerifyOtpMutation,
  useChangePasswordMutation,
  useCreateSchoolMutation,
  useAcademicYearQuery,
  useCreateClassFeesMutation,
  useGetSchoolTransactionHistoryQuery
} = api;
