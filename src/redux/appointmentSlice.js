import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: []
  },
  reducers: {
    addAppointmentToReduxToolkit: (state, action) => {
      const appointmentToSave = action.payload;
      state.appointments.push(appointmentToSave);
    },
    deleteAppointmentInReduxToolkit: (state, action) => {
      const indexOfAppointmentToUpdate = state.appointments.findIndex(appointmentToDelete => {
        return appointmentToDelete.appointmentId === action.payload;
      });
      state.appointments.splice(indexOfAppointmentToUpdate, 1)
    }, 
    setDateAndTimeOfUpdateOfAppointmentInReduxToolkit: (state, action) => {
      const indexOfAppointmentToUpdate = state.appointments.findIndex(appointmentForWhichToSetDateAndTime => {
        return appointmentForWhichToSetDateAndTime.appointmentId === action.payload.appointmentId;
      });
      state.appointments[indexOfAppointmentToUpdate].appointmentLastUpdatedOnDateTime = action.payload.systemDateTime;
    }}
})
export const { 
  addAppointmentToReduxToolkit, 
  deleteAppointmentInReduxToolkit, 
  setDateAndTimeOfUpdateOfAppointmentInReduxToolkit
} = appointmentSlice.actions;

export default appointmentSlice.reducer;    

