import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  storeAccessToken,
  removeAccessToken,
  getAccessToken,
} from "../../../lib/secureLocalStorage";

const baseUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");
const endPointOfReg = import.meta.env.VITE_REGISTER_URL;
const endPointOfOtp = import.meta.env.VITE_OTP_URL;
const endPointOfLogin = import.meta.env.VITE_LOGIN_URL;
const endPointOfResentOtp = import.meta.env.VITE_RESENT_OTP;
const endPointOfUserProfile = import.meta.env.VITE_GET_USER_PROFILE;

const initialState = {
  createUser: {},
  verifyEmail: {},
  profile: {},
  // accessToken: {},
  status: "idle",
  error: null,
};

// fetch user register
export const fetchCreateUser = createAsyncThunk(
  "user/fetchCreateUser",
  async ({ username, email, password, confirmPassword }) => {
    // convert javaScript object to json
    const body = JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    });
    const respone = await fetch(`${baseUrl}${endPointOfReg}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    // convert json to javaScriptobject
    const user = await respone.json();
    // console.log(data);
    return user;
  }
);

// fetch verify email
export const fetchVerifyEmail = createAsyncThunk(
  "user/fetchVerifyEmail",
  async ({ email, otp_code }) => {
    const body = JSON.stringify({
      email,
      otp_code,
    });
    const response = await fetch(`${baseUrl}${endPointOfOtp}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const apiResponse = await response.json();
    return apiResponse;
  }
);

// fetch resend OTP
export const fetchResendOTP = createAsyncThunk(
  "user/fetchResendOTP",
  async ({ email }) => {
    const body = JSON.stringify({ email });
    const response = await fetch(`${baseUrl}${endPointOfResentOtp}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const apiResponse = await response.json();
    return apiResponse;
  }
);

// Login User
export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async ({ email, password }) => {
    const body = JSON.stringify({
      email,
      password,
    });
    const response = await fetch(`${baseUrl}${endPointOfLogin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const accessToken = await response.json();
    return accessToken;
  }
);

// fetch userProfile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}${endPointOfUserProfile}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
    const user = await response.json();
    console.log("API response:", user); // Log the API response
    return user;
  }
);

// create Reducer and action
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      removeAccessToken();
    },
    updateUserProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(fetchCreateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload)
        state.status = "success";
        state.createUser = action.payload;
      })
      .addCase(fetchCreateUser.rejected, (state) => {
        state.status = "failed";
      })
      // Verify email
      .addCase(fetchVerifyEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVerifyEmail.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload)
        state.status = "success";
        state.verifyEmail = action.payload;
      })
      .addCase(fetchVerifyEmail.rejected, (state) => {
        state.status = "failed";
      })
      // Resend OTP
      .addCase(fetchResendOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResendOTP.fulfilled, (state, action) => {
        state.status = "success";
        // handle response if needed
      })
      .addCase(fetchResendOTP.rejected, (state) => {
        state.status = "failed";
      })
      // Login
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload.access);
        state.status = "success";
        storeAccessToken(action.payload.access);
        // state.accessToken = action.payload.access;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = "failed";
      })
      // user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
        console.log("user profile", action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export reducer
export default userSlice.reducer;

// export action
export const { logout, updateUserProfile } = userSlice.actions;

// export selector
export const selectUser = (state) => state?.user?.createUser;
export const selectVerifyEmail = (state) => state?.user?.verifyEmail;
// export const selectAccessToken = (state) => state?.user?.accessToken;

export const selectUserProfile = (state) => state?.user?.profile;
export const selectUserStatus = (state) => state?.user?.status;
