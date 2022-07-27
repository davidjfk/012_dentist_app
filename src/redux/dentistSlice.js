import { createSlice } from "@reduxjs/toolkit";

export const dentistListSlice = createSlice({
  name: "dentists",
  initialState: {
    dentists: []
  },
  reducers: {
    addDentist: (state, action) => {
      const dentistToSave = action.payload;
      state.dentists.push(dentistToSave);
    },
    addDentists: (state, action) => {
      const dentistsToSave = action.payload; 
      state.dentists = dentistsToSave; // dentistsToSave is an array with dentist objects.
    }}
})
export const { addDentist, addDentists } = dentistListSlice.actions;

export default dentistListSlice.reducer;    

