import { createSlice } from "@reduxjs/toolkit";

export const assistantListSlice = createSlice({
  name: "assistants",
  initialState: {
    assistants: []
  },
  reducers: {
    // use_case_10_add_assistant (as direct fn call without UI)
    addAssistant: (state, action) => {
      const {assistantId, lastName, firstName, phone, email, isSick, skillLevel, appointmentsDeletedOnDateTime} = action.payload
      const assistantToSave = {assistantId, email, firstName, isSick, lastName,  phone, skillLevel, appointmentsDeletedOnDateTime};
      state.assistants.push(assistantToSave);
    },
    // use_case_00_create_mock_data
    addAssistants: (state, action) => {
      const assistantsToSave = action.payload; 
      state.assistants = assistantsToSave; 
    },
    // not a winc requirement
    deleteAssistant: (state, action) => {
      const indexOfAssistantToDelete = state.assistants.findIndex(assistantToDelete => {
        return assistantToDelete.assistantId === action.payload.assistantid;
      });
      state.assistants.splice(indexOfAssistantToDelete, 1)
    },
    // not a winc requirement
    setDateAndTimeOfDeletionOfAppointmentsOfAssistantInReduxToolkit: (state, action) => {
      const indexOfAssistantToDelete = state.assistants.findIndex(assistantForWhomToSetDateAndTime => {
        return assistantForWhomToSetDateAndTime.assistantId === action.payload.assistantId;
      });
      state.assistants[indexOfAssistantToDelete].appointmentsDeletedOnDateTime = action.payload.systemDateTime;
    },
    // use_case_09_give_appointments_of_sick_assistant_an_orange_background_color: via UI
    toggleHealthStatusOfAssistant: (state, action) => {
      const indexOfAssistant = state.assistants.findIndex(assistantToToggleHealth => {
        return assistantToToggleHealth.assistantId === action.payload.assistantId;
      });
      state.assistants[indexOfAssistant].isSick = (action.payload.isSick)
    }}

})
export const { addAssistant, addAssistants, deleteAssistant, setDateAndTimeOfDeletionOfAppointmentsOfAssistantInReduxToolkit, toggleHealthStatusOfAssistant } = assistantListSlice.actions;

export default assistantListSlice.reducer;    




