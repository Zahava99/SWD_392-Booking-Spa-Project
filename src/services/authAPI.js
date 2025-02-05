import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";

export const authApi = createApi({
  reducerPath: "authManagement",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL_BE }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: `users/login`,
        method: "POST",
        body: { email, password },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ id, oldPassword, password, retypePassword }) => ({
        url: `users/update_password/${id}`,
        method: "PUT",
        body: {
          oldPassword: oldPassword,
          password: password,
          retypePassword: retypePassword,
        },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => {
        return {
          method: "POST",
          url: `forgot_password/verify_otp/${email}`,
          body: { otp: otp },
        };
      },
    }),
    verifyMail: builder.mutation({
      query: ({ email }) => {
        return {
          method: "POST",
          url: `forgot_password/verify_mail/${email}`,
        };
      },
    }),
    changePasswordByEmail: builder.mutation({
      query: ({ email, password, confirmPassword }) => {
        return {
          method: "POST",
          url: `forgot_password/change_password/${email}`,
          body: { password: password, retypePassword: confirmPassword },
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useUpdatePasswordMutation,
  useVerifyMailMutation,
  useVerifyOtpMutation,
  useChangePasswordByEmailMutation,
} = authApi;
