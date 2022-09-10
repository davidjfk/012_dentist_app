import { createSlice } from "@reduxjs/toolkit";

export const updateAppointmentSlice = createSlice({
  name: "updateAppointment",
  initialState: {
    stateOfComponentUpdateAppointment: { }
  },
  reducers: {
    disableUiControlsDuringAppointmentUpdate: (state, action) => {
      state.pointerEvents = "none";
    },
    enableUiControlsDuringAppointmentUpdate: (state, action) => {
      state.pointerEvents = "auto"; 
    },
    // use_case_12_bonus_working_form_and_buttons_for_all_operations
    hideComponentUpdateAppointmentReduxToolkit: (state, action) => {
      state.isNowUpdatingAppointment = false;
    },
    // use_case_12_bonus_working_form_and_buttons_for_all_operations
    saveAppointmentToReduxToolkit: (state, action) => {
      state.appointmentSavedInReduxToolkit = action.payload;
    },
    // use_case_12_bonus_working_form_and_buttons_for_all_operations
    showComponentUpdateAppointmentReduxToolkit: (state, action) => {
      state.isNowUpdatingAppointment = true;
    },
    // use_case_12_bonus_working_form_and_buttons_for_all_operations
    xxtoggleVisibilityOfComponentUpdateAppointment: (state, action) => {
      state.isNowUpdatingAppointment = action.payload;
    }}
})
export const {disableUiControlsDuringAppointmentUpdate, enableUiControlsDuringAppointmentUpdate, hideComponentUpdateAppointmentReduxToolkit, saveAppointmentToReduxToolkit, showComponentUpdateAppointmentReduxToolkit, xxtoggleVisibilityOfComponentUpdateAppointment} = updateAppointmentSlice.actions;

export default updateAppointmentSlice.reducer;    

