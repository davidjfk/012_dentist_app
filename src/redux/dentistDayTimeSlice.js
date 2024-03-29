import { createSlice } from "@reduxjs/toolkit";

export const dentistDayTimeSlice = createSlice({
  name: "dentistDayTimes",
  initialState: {
    dentistDayTimes: []
  },
  reducers: {
    addDayTimeDentistToReduxToolkit: (state, action) => {
      const stuffToSave = action.payload;
      state.dentistDayTimes.push(stuffToSave);
    },
    deleteDayTimeDentist: (state, action) => {
      const indexOfDentistDayTimeToDelete = state.dentistDayTimes.indexOf(action.payload);
      state.dentistDayTimes.splice(indexOfDentistDayTimeToDelete, 1)  
    }},
})
export const { addDayTimeDentistToReduxToolkit, deleteDayTimeDentist } = dentistDayTimeSlice.actions;

export default dentistDayTimeSlice.reducer;    

