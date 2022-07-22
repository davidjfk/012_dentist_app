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
    }}
})
export const { addDayTimeClient } = clientDayTimeSlice.actions;

export default clientDayTimeSlice.reducer;    

