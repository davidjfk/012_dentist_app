import { createSlice } from "@reduxjs/toolkit";

const log = console.log;

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
      const indexOfDentistDayTimeToDelete = state.dentistDayTimes.indexOf(action.payload);
      // log(`appointmentIndex:`)
      // log(indexOfDentistDayTimeToDelete)
      state.dentistDayTimes.splice(indexOfDentistDayTimeToDelete, 1)  
      // state.dentistDayTimes.splice(action.payload, 1)
    }},
})
export const { addDayTimeDentist, deleteDayTimeDentist } = dentistDayTimeSlice.actions;

export default dentistDayTimeSlice.reducer;    

