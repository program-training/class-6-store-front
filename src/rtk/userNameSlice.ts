import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserRegister } from "./interface";

interface UserNameSlice {
  flag: boolean;
  userName: string | null;
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

const initialState: UserNameSlice = {
  flag: false,
  userName: null,
  userId: null,
  firstName: null,
  lastName: null,
  email: null
};

export const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<UserRegister>) => {
      state.userName = action.payload.username;
      state.flag = true;
      state.userId = action.payload._id ? action.payload._id : null;
      state.firstName = action.payload.firstName
        ? action.payload.firstName
        : null;
      state.lastName = action.payload.lastName ? action.payload.lastName : null;
      state.email = action.payload.email ? action.payload.email : null
    },
    resetUserName: (state) => {
      state.flag = false
      state.userName = null
      state.userId = null
      state.firstName = null
      state.lastName = null
      state.email = null
    },
  },
});

export const { setUserName, resetUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
