import { createSlice } from "@reduxjs/toolkit";

export const assistantDayTimeSlice = createSlice({
  name: "assistantDayTimes",
  initialState: {
    assistantDayTimes: []
  },
  reducers: {
    addDayTimeAssistantToReduxToolkit: (state, action) => {
      const stuffToSave = action.payload;
      state.assistantDayTimes.push(stuffToSave);
    },
    deleteDayTimeAssistant: (state, action) => {
      const indexOfAssistantDayTimeToDelete = state.assistantDayTimes.indexOf(action.payload);
      state.assistantDayTimes.splice(indexOfAssistantDayTimeToDelete, 1)  
    }},
})
export const { addDayTimeAssistantToReduxToolkit, deleteDayTimeAssistant } = assistantDayTimeSlice.actions;

export default assistantDayTimeSlice.reducer;    

