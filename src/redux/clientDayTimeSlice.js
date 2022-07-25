import { createSlice } from "@reduxjs/toolkit";

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
      // const stuffToSave = action.payload;
      state.clientDayTimes.splice(action.payload, 1)
    }},
})
export const { addDayTimeClient, deleteDayTimeClient } = clientDayTimeSlice.actions;

export default clientDayTimeSlice.reducer;    

