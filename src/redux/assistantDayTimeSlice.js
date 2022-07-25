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
    },
    deleteDayTimeAssistant: (state, action) => {
      state.assistantDayTimes.splice(action.payload, 1)
    }},
})
export const { addDayTimeAssistant, deleteDayTimeAssistant } = assistantDayTimeSlice.actions;

export default assistantDayTimeSlice.reducer;    

