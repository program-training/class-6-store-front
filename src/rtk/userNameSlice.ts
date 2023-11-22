import { createSlice } from "@reduxjs/toolkit";


interface UserNameSlice {
  flag: boolean;
  userName: string;
}

const initialState: UserNameSlice = {
  flag: false,
  userName: "",
};

export const productsSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
      state.flag = true;
    },
    resetUserName: (state) => {
      state = initialState;
    },
  },
});

export const {setUserName, resetUserName} = productsSlice.actions;
export default productsSlice.reducer;
