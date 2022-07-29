import { createSlice } from "@reduxjs/toolkit";

export const assistantListSlice = createSlice({
  name: "assistants",
  initialState: {
    assistants: []
  },
  reducers: {
    addAssistant: (state, action) => {
      const assistantToSave = action.payload;
      state.assistants.push(assistantToSave);
    },
    addAssistants: (state, action) => {
      const assistantsToSave = action.payload; 
      state.assistants = assistantsToSave; // dentistsToSave is an array with dentist objects.
    },
    setAssistantToSick: (state, action) => {
      // console.log('inside assistantList Slice:')
      let index = action.payload; 
      state.assistants[index].isSick = true; 

      // console.log(typeof(index) )
    }}
})
export const { addAssistant, addAssistants, setAssistantToSick } = assistantListSlice.actions;

export default assistantListSlice.reducer;    

