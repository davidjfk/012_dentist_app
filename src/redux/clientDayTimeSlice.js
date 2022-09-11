import { createSlice } from "@reduxjs/toolkit";

export const clientDayTimeSlice = createSlice({
  name: "clientDayTime",
  initialState: {
    clientDayTimes: []  
  },
  reducers: {
    addDayTimeClient: (state, action) => {
      const stuffToSave = action.payload;
      state.clientDayTimes.push(stuffToSave);
    },
    deleteDayTimeClient: (state, action) => {
      const indexOfClientDayTimeToDelete = state.clientDayTimes.indexOf(action.payload);
      state.clientDayTimes.splice(indexOfClientDayTimeToDelete, 1)  
    }},
})
export const { addDayTimeClient, deleteDayTimeClient } = clientDayTimeSlice.actions;

export default clientDayTimeSlice.reducer;    

