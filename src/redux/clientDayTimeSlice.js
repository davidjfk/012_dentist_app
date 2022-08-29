import { createSlice } from "@reduxjs/toolkit";

const log = console.log;

export const clientDayTimeSlice = createSlice({
  name: "clientDayTime",
  initialState: {
    clientDayTimes: []  // reservedCombinationsOfClientAndDayAndTime
  },
  reducers: {
    addDayTimeClient: (state, action) => {
      const stuffToSave = action.payload;
      state.clientDayTimes.push(stuffToSave);
    },
    deleteDayTimeClient: (state, action) => {
      // log(`redux-toolkit: action deleteDayTimeClient: start`)
      // log(action.payload);
      /*
        // state.clientDayTimes.splice(action.payload, 1) 
        logs index position of appointment in the sorted list of component AppointmentInAppointmentList. 
        But the list of appointments in clientDayTimes above is NOT sorted!!
        So you do delete an item from the array, but most of the times the wrong one.
        solution: (also applies for dentistDayTimes and assistantDayTimes)
      */
      const indexOfClientDayTimeToDelete = state.clientDayTimes.indexOf(action.payload);
      state.clientDayTimes.splice(indexOfClientDayTimeToDelete, 1)  

    }},
})
export const { addDayTimeClient, deleteDayTimeClient } = clientDayTimeSlice.actions;

export default clientDayTimeSlice.reducer;    

