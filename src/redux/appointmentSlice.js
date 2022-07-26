import { createSlice } from "@reduxjs/toolkit";

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
    deleteAppointment: (state, action) => {
      state.appointments.splice(action.payload, 1)

    }}
})
export const { addAppointments, addAppointment, deleteAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;    

