import { createSlice } from "@reduxjs/toolkit";
const log = console.log;


export const updateAppointmentSlice = createSlice({
  name: "updateAppointment",
  initialState: {
    stateOfComponentUpdateAppointment: {
      // isNowUpdatingAppointment: false,
      // appointmentSavedInReduxToolkit: {   
      //   clientId:"", 
      //   treatmentType: "",
      //   appointmentPriority: 1,
      //   day: 1, 
      //   time: "08", 
      //   dentistId: "", 
      //   assistantId: "",    
      //   appointmentLastUpdatedOnDateTime: "",
      //   isNowUpdatingAppointment: false
      }
  },
  reducers: {
    // use_case_12_bonus_working_form_and_buttons_for_all_operations
    saveAppointmentToReduxToolkit: (state, action) => {
      log('in the redux-toolkit: action toggleVisibilityOfComponentUpdateAppointment: ')
      log(`action.payload:`)
      log(action.payload)
      state.appointmentSavedInReduxToolkit = action.payload;
      log(state.appointmentSavedInReduxToolkit);
    },
    // use_case_12_bonus_working_form_and_buttons_for_all_operations
    toggleVisibilityOfComponentUpdateAppointment: (state, action) => {
      // log('in the redux-toolkit: action toggleVisibilityOfComponentUpdateAppointment: ')
      // log(`action.payload:`)
      // log(action.payload)
      state.isNowUpdatingAppointment = action.payload;
    }}
})
export const {saveAppointmentToReduxToolkit, toggleVisibilityOfComponentUpdateAppointment} = updateAppointmentSlice.actions;

export default updateAppointmentSlice.reducer;    

