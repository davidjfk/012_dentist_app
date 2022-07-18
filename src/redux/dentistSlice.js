import { createSlice } from "@reduxjs/toolkit";

export const dentistListSlice = createSlice({
  name: "dentists",
  initialState: {
    dentists: []
  },
  reducers: {
    addDentist: (state, action) => {
      const randomDentistsFromMockaroo = action.payload;
      state.dentists.push(...randomDentistsFromMockaroo);
    }}
})
export const { addDentist } = dentistListSlice.actions;

export default dentistListSlice.reducer;    

