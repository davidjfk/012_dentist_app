import { createSlice } from "@reduxjs/toolkit";

export const assistantDayTimeSlice = createSlice({
  name: "assistantDayTimes",
  initialState: {
    assistantDayTimes: []
  },
  reducers: {
    addDayTimeAssistant: (state, action) => {
      const stuffToSave = action.payload;
      state.assistantDayTimes.push(stuffToSave);
    }}
})
export const { addDayTimeAssistant } = assistantDayTimeSlice.actions;

export default assistantDayTimeSlice.reducer;    

