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
    },
    setAssistantToSick: (state, action) => {
      console.log('inside assistantList Slice:')
      let index = action.payload; 
      state.assistants[index].isSick = true; 

      console.log(typeof(index) )
    }}
})
export const { addAssistant, setAssistantToSick } = assistantListSlice.actions;

export default assistantListSlice.reducer;    

