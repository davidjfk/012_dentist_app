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
    },
    deleteDayTimeDentist: (state, action) => {
      state.dentistDayTimes.splice(action.payload, 1)
    }},
})
export const { addDayTimeDentist, deleteDayTimeDentist } = dentistDayTimeSlice.actions;

export default dentistDayTimeSlice.reducer;    

