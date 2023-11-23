import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserRegister } from "./interface";

interface UserNameSlice {
  flag: boolean;
  userName: string | null;
  userId: string | null;
}

const initialState: UserNameSlice = {
  flag: false,
  userName: null,
  userId: null,
};

export const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<UserRegister>) => {
      state.userName = action.payload.username;
      state.flag = true;
      state.userId = action.payload._id ? action.payload._id : null;
    },
    resetUserName: (state) => {
      state = initialState;
    },
  },
});

export const { setUserName, resetUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
