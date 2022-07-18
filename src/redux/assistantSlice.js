import { createSlice } from "@reduxjs/toolkit";

export const assistantListSlice = createSlice({
  name: "assistants",
  initialState: {
    assistants: []
  },
  reducers: {
    addAssistant: (state, action) => {
      const randomAssistantsFromMockaroo = action.payload;
      state.assistants.push(...randomAssistantsFromMockaroo);
    }}
})
export const { addAssistant } = assistantListSlice.actions;

export default assistantListSlice.reducer;    

