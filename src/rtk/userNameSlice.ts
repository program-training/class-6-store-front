import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserRegister } from "../interfaces/userRegister";

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
      console.log(action.payload.username);
      
      state.userName = action.payload.username;
      state.flag = true;
      state.userId = action.payload._id
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
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
