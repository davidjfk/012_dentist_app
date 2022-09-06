import { createSlice } from "@reduxjs/toolkit";
const log = console.log;


export const updateAppointmentSlice = createSlice({
  name: "updateAppointment",
  initialState: {
    stateOfComponentUpdateAppointment: {
      }
  },
  reducers: {
    hideComponentUpdateAppointmentReduxToolkit: (state, action) => {
      // log('in the redux-toolkit: action toggleVisibilityOfComponentUpdateAppointment: ')
      // log(`action.payload:`)
      // log(action.payload)
      state.isNowUpdatingAppointment = false;
    },
    // use_case_12_bonus_working_form_and_buttons_for_all_operations
    saveAppointmentToReduxToolkit: (state, action) => {
      log('in the redux-toolkit: action toggleVisibilityOfComponentUpdateAppointment: ')
      log(`action.payload:`)
      log(action.payload)
      state.appointmentSavedInReduxToolkit = action.payload;
      log(state.appointmentSavedInReduxToolkit);
    },
    // use_case_12_bonus_working_form_and_buttons_for_all_operations
    showComponentUpdateAppointmentReduxToolkit: (state, action) => {
      // log('in the redux-toolkit: action toggleVisibilityOfComponentUpdateAppointment: ')
      // log(`action.payload:`)
      // log(action.payload)
      state.isNowUpdatingAppointment = true;
    },
    // use_case_12_bonus_working_form_and_buttons_for_all_operations
    toggleVisibilityOfComponentUpdateAppointment: (state, action) => {
      state.isNowUpdatingAppointment = action.payload;
    }}
})
export const {hideComponentUpdateAppointmentReduxToolkit, saveAppointmentToReduxToolkit, showComponentUpdateAppointmentReduxToolkit, toggleVisibilityOfComponentUpdateAppointment} = updateAppointmentSlice.actions;

export default updateAppointmentSlice.reducer;    

