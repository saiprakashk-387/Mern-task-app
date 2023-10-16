import { createSlice } from "@reduxjs/toolkit";

const sampleSlice = createSlice({
  name: "sample",
  initialState: {
    ///auth//
    userLogin: [],
    getLoginOtp: [],
    //admin///
    allusers: [],
    deleteUserAdmin: [],
    myProfile: [],
    profileUpdate: [],
    userSubList: [],
    attendenceRequest: [],
    ///user//
    allPresons: [],
    adduser: [],
    userUpdate: [],
    deleteUser: [],
    userAppLoginn: [],
    attendenceLog: [],
    ///image upload
    cloudImage: [],
    error: false,
    isLoading: true,
    ///state//
  },
  ///reducer
  reducers: {
    ///action
    ///auth///
    UserLoginAction: (state, { payload }) => {
      state.userLogin = payload;
      state.isLoading = false;
    },
    UserLoginOtpAction: (state, { payload }) => {
      state.getLoginOtp = payload;
      state.isLoading = false;
    },
    //admin
    AllUsersAdminAction: (state, { payload }) => {
      state.allusers = payload;
      state.isLoading = false;
    },
    DeleteUserAdminAction: (state, { payload }) => {
      state.deleteUserAdmin = payload;
      state.isLoading = false;
    },
    myProfileAction: (state, { payload }) => {
      state.myProfile = payload;
      state.isLoading = false;
    },
    profileUpdateAction: (state, { payload }) => {
      state.profileUpdate = payload;
      state.isLoading = false;
    },
    UserSubListAction: (state, { payload }) => {
      state.userSubList = payload;
      state.isLoading = false;
    },
    AttendenceRequestAction: (state, { payload }) => {
      state.attendenceRequest = payload;
      state.isLoading = false;
    },
    ///user///
    AllPersonsAction: (state, { payload }) => {
      state.allPresons = payload;
      state.isLoading = false;
    },
    AddUserAction: (state, { payload }) => {
      state.adduser = payload;
      state.isLoading = false;
    },
    UserUpdateAction: (state, { payload }) => {
      state.userUpdate = payload;
      state.isLoading = false;
    },
    UserDeleteAction: (state, { payload }) => {
      state.deleteUser = payload;
      state.isLoading = false;
    },
    UserAppLoginnAction: (state, { payload }) => {
      state.userAppLoginn = payload;
      state.isLoading = false;
    },
    AttendenceLogAction: (state, { payload }) => {
      state.attendenceLog = payload;
      state.isLoading = false;
    },
    ///image  upload
    profileImageAction: (state, { payload }) => {
      state.cloudImage = payload;
      state.isLoading = false;
    },
  },
});

export const {
  UserLoginAction,
  UserLoginOtpAction,
  //admin//
  AllUsersAdminAction,
  DeleteUserAdminAction,
  myProfileAction,
  profileUpdateAction,
  UserSubListAction,
  AttendenceRequestAction,
  //user///
  AllPersonsAction,
  AddUserAction,
  UserUpdateAction,
  UserDeleteAction,
  UserAppLoginnAction,
  AttendenceLogAction,
  ///image upload//
  profileImageAction,
} = sampleSlice.actions;

///assign state to selector
export const userLoginSelector = (state) => state.sample;
export const userLoginOtpSelector = (state) => state.sample;
//admin///
export const adminUsersSelector = (state) => state.sample;
export const adminUserDeleteSelector = (state) => state.sample;
export const profileSelector = (state) => state.sample;
export const profileUpdateSelector = (state) => state.sample;
export const userSubListSelector = (state) => state.sample;
export const attendenceRequestSelector = (state) => state.sample;
//user//
export const userPersonsSelector = (state) => state.sample;
export const addUserSelector = (state) => state.sample;
export const userUpdateSelector = (state) => state.sample;
export const userDeleteSelector = (state) => state.sample;
export const UserAppLoginnSelector = (state) => state.sample;
export const AttendenceLogSelector = (state) => state.sample;
///imageupload
export const profileImageSelector = (state) => state.sample;

//export reducer
const sampleReducer = sampleSlice.reducer;
export default sampleReducer;
