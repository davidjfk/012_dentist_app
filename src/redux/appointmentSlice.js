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

    }}
})
export const { addAppointments, addAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;    

