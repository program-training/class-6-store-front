import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface UserNameSlice {
  flag: boolean;
}

const initialState: UserNameSlice = {
  flag: false,
};

export const productsSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.flag = action.payload;
    },
  },
});

export const {setOpen} = productsSlice.actions;
export default productsSlice.reducer;
