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
      const {assistantId, lastName, firstName, phone, email, isSick, skillLevel, appointmentsDeletedOnDateTime} = action.payload
      const assistantToSave = {assistantId, email, firstName, isSick, lastName,  phone, skillLevel, appointmentsDeletedOnDateTime};
      state.assistants.push(assistantToSave);
    },
    // use_case_00_create_mock_data
    addAssistants: (state, action) => {
      const assistantsToSave = action.payload; 
      state.assistants = assistantsToSave; // dentistsToSave is an array with dentist objects.
    },
    // not a winc requirement
    deleteAssistant: (state, action) => {
      log('in the redux-toolkit: action deleteAssistant: ')
      log(action.payload.assistantId)
      const indexOfAssistantToDelete = state.assistants.findIndex(assistantToDelete => {
        return assistantToDelete.assistantId === action.payload.assistantid;
      });
      log(`indexOfAssistantToDelete: ${indexOfAssistantToDelete}`)
      state.assistants.splice(indexOfAssistantToDelete, 1)
    },
    // use_case_09_give_appointments_of_sick_assistant_an_orange_background_color: as direct fn call without UI
    setAssistantToSick: (state, action) => {
      // console.log('inside assistantList Slice:')
      let index = action.payload; 
      state.assistants[index].isSick = true; 
      // console.log(typeof(index) )
    },
    // not a winc requirement
    setDateAndTimeOfDeletionOfAppointmentsOfAssistantInReduxToolkit: (state, action) => {
      log('in the redux-toolkit: action setDateAndTimeOfDeletionOfAppointmentsOfAssistantInReduxToolkit: ')
      log(`systemDateTime:`)
      log(action.payload.systemDateTime)
      log(`assistantId:`)
      log(action.payload.assistantId)
      const indexOfAssistantToDelete = state.assistants.findIndex(assistantForWhomToSetDateAndTime => {
        return assistantForWhomToSetDateAndTime.assistantId === action.payload.assistantId;
      });
      log(`indexOfAssistantToDelete: `)
      log(indexOfAssistantToDelete)
      log(typeof(indexOfAssistantToDelete))
      state.assistants[indexOfAssistantToDelete].appointmentsDeletedOnDateTime = action.payload.systemDateTime;
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
export const { addAssistant, addAssistants, deleteAssistant, setAssistantToSick, setDateAndTimeOfDeletionOfAppointmentsOfAssistantInReduxToolkit, toggleHealthStatusOfAssistant } = assistantListSlice.actions;

export default assistantListSlice.reducer;    

