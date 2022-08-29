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
      // log(`appointmentSlice: action deleteAppointmentInReduxToolkit:`)
      const indexOfAppointmentToUpdate = state.appointments.findIndex(appointmentToDelete => {
        return appointmentToDelete.appointmentId === action.payload;
      });
      // log(`appointmentIndex:`)
      // log(indexOfAppointmentToUpdate)
      state.appointments.splice(indexOfAppointmentToUpdate, 1)
    },
    // not a winc requirement
    setDateAndTimeOfUpdateOfAppointmentInReduxToolkit: (state, action) => {
      // log('in the redux-toolkit: action setDateAndTimeOfUpdateOfAppointmentInReduxToolkit: ')
      // log(`systemDateTime:`)
      // log(action.payload.systemDateTime)
      // log(`appointmentId:`)
      // log(action.payload.appointmentId)
      const indexOfAppointmentToUpdate = state.appointments.findIndex(appointmentForWhichToSetDateAndTime => {
        return appointmentForWhichToSetDateAndTime.appointmentId === action.payload.appointmentId;
      });
      // log(`indexOfAppointmentToUpdate: `)
      // log(indexOfAppointmentToUpdate)
      // log(typeof(indexOfAppointmentToUpdate))
      state.appointments[indexOfAppointmentToUpdate].appointmentLastUpdatedOnDateTime = action.payload.systemDateTime;
    }}
})
export const { addAppointment, deleteAppointmentInReduxToolkit, setDateAndTimeOfUpdateOfAppointmentInReduxToolkit} = appointmentSlice.actions;

export default appointmentSlice.reducer;    

