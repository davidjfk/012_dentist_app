import { createSlice } from "@reduxjs/toolkit";
const log = console.log;


export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: []
  },
  reducers: {
    // addAppointments: (state, action) => {
    //   const randomAssistantsFromMockaroo = action.payload;
    //   state.appointments.push(...randomAssistantsFromMockaroo);
    // },
    addAppointment: (state, action) => {
      const appointmentToSave = action.payload;
      state.appointments.push(appointmentToSave);

    },
    deleteAppointmentInReduxToolkit: (state, action) => {
      log(`appointmentSlice: action deleteAppointmentVersionTwo:`)
      const indexOfAppointmentToDelete = state.appointments.findIndex(appointmentToDelete => {
        return appointmentToDelete.appointmentId === action.payload;
      });
      log(`index of the appointment (inside array) to delete:`)
      log(indexOfAppointmentToDelete)
      state.appointments.splice(indexOfAppointmentToDelete, 1)
    },
    deleteAppointment_not_in_use: (state, action) => {
      state.appointments.splice(action.payload, 1)
    }}
})
export const { addAppointments, addAppointment, deleteAppointmentInReduxToolkit } = appointmentSlice.actions;

export default appointmentSlice.reducer;    

