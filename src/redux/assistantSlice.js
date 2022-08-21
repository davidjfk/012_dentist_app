import { createSlice } from "@reduxjs/toolkit";
const log = console.log;

export const assistantListSlice = createSlice({
  name: "assistants",
  initialState: {
    assistants: []
  },
  reducers: {
    // use_case_10_add_assistant (as direct fn call without UI)
    addAssistant: (state, action) => {
      // const assistantToSave = action.payload;
      const {assistantId, lastName, firstName, phone, email, isSick, skillLevel} = action.payload
      const assistantToSave = {assistantId, lastName, firstName, phone, email, isSick, skillLevel};
      state.assistants.push(assistantToSave);
    },
    // use_case_00_create_mock_data
    addAssistants: (state, action) => {
      const assistantsToSave = action.payload; 
      state.assistants = assistantsToSave; // dentistsToSave is an array with dentist objects.
    },
    // use_case_03_delete_appointment (use this action only to delete an appointment, but not to delete an assistant)
    deleteAssistant: (state, action) => {
      const indexOfSongToDelete = state.assistants.findIndex(songToDelete => {
        return songToDelete.id === action.payload;
      });
      state.assistants.splice(indexOfSongToDelete, 1)
    },
    // use_case_09_give_appointments_of_sick_assistant_an_orange_background_color: as direct fn call without UI
    setAssistantToSick: (state, action) => {
      // console.log('inside assistantList Slice:')
      let index = action.payload; 
      state.assistants[index].isSick = true; 
      // console.log(typeof(index) )
    },
    // use_case_09_give_appointments_of_sick_assistant_an_orange_background_color: via UI
    toggleHealthStatusOfAssistant: (state, action) => {
      console.log('in the redux-toolkit:')
      console.log(action.payload)
      const indexOfAssistant = state.assistants.findIndex(assistantToToggleHealth => {
        return assistantToToggleHealth.assistantId === action.payload.assistantId;
      });
      log(`indexOfAssistant: ${indexOfAssistant}`)
      log(state.assistants[indexOfAssistant].isSick = (action.payload.isSick))
      // log(state.assistants[indexOfAssistant].isSick = (!state.assistants[indexOfAssistant].isSick))
    }}

})
export const { addAssistant, addAssistants, deleteAssistant, setAssistantToSick, toggleHealthStatusOfAssistant } = assistantListSlice.actions;

export default assistantListSlice.reducer;    

