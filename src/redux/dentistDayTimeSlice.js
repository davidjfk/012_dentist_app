import { createSlice } from "@reduxjs/toolkit";

export const dentistDayTimeSlice = createSlice({
  name: "dentistDayTimes",
  initialState: {
    dentistDayTimes: []
  },
  reducers: {
    addDayTimeDentist: (state, action) => {
      const stuffToSave = action.payload;
      state.dentistDayTimes.push(stuffToSave);
    }}
})
export const { addDayTimeDentist } = dentistDayTimeSlice.actions;

export default dentistDayTimeSlice.reducer;    

