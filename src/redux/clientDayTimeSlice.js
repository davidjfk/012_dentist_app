import { createSlice } from "@reduxjs/toolkit";

export const clientDayTimeSlice = createSlice({
  name: "clientDayTime",
  initialState: {
    clientDayTimes: []  
  },
  reducers: {
    addDayTimeClientToReduxToolkit: (state, action) => {
      const stuffToSave = action.payload;
      state.clientDayTimes.push(stuffToSave);
    },
    deleteDayTimeClient: (state, action) => {
      const indexOfClientDayTimeToDelete = state.clientDayTimes.indexOf(action.payload);
      state.clientDayTimes.splice(indexOfClientDayTimeToDelete, 1)  
    }},
})
export const { addDayTimeClientToReduxToolkit, deleteDayTimeClient } = clientDayTimeSlice.actions;

export default clientDayTimeSlice.reducer;    

