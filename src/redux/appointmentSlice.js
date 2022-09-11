import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: [],
    addAppoinmentDataThatHaveNotYetBeenSubmitted: {
        clientIdFromAddForm: '',
        treatmentTypeFromAddForm: '',
        appointmentPriorityFromAddForm:'',
        dayFromAddForm:'',
        timeFromAddForm:'',
        dentistIdFromAddForm:'',
        assistantIdFromAddForm:''
        }
  },
  reducers: {
    addAppointment: (state, action) => {
      const appointmentToSave = action.payload;
      state.appointments.push(appointmentToSave);
    },
    deleteAppointmentInReduxToolkit: (state, action) => {
      const indexOfAppointmentToUpdate = state.appointments.findIndex(appointmentToDelete => {
        return appointmentToDelete.appointmentId === action.payload;
      });
      state.appointments.splice(indexOfAppointmentToUpdate, 1)
    },
    saveFromNotYetSubmittedAddAppointmentFormTheClientId: (state, action) => {
      const clientIdFromAddForm = action.payload; 
      console.log(clientIdFromAddForm)
      state.addAppoinmentDataThatHaveNotYetBeenSubmitted.clientIdFromAddForm = clientIdFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheTreatmentType: (state, action) => {
      const treatmentTypeFromAddForm = action.payload; 
      state.addAppoinmentDataThatHaveNotYetBeenSubmitted.treatmentTypeFromAddForm = treatmentTypeFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheAppointmentPriority: (state, action) => {
      const appointmentPriorityFromAddForm = action.payload; 
      state.addAppoinmentDataThatHaveNotYetBeenSubmitted.appointmentPriorityFromAddForm = appointmentPriorityFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheDay: (state, action) => {
      const dayFromAddForm = action.payload; 
      state.addAppoinmentDataThatHaveNotYetBeenSubmitted.dayFromAddForm = dayFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheTime: (state, action) => {
      const timeFromAddForm = action.payload; 
      state.addAppoinmentDataThatHaveNotYetBeenSubmitted.timeFromAddForm = timeFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheDentistId: (state, action) => {
      const dentistIdFromAddForm = action.payload; 
      state.addAppoinmentDataThatHaveNotYetBeenSubmitted.dentistIdFromAddForm = dentistIdFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheAssistantId: (state, action) => {
      const assistantIdFromAddForm = action.payload; 
      state.addAppoinmentDataThatHaveNotYetBeenSubmitted.assistantIdFromAddForm = assistantIdFromAddForm; 
    },
    setDateAndTimeOfUpdateOfAppointmentInReduxToolkit: (state, action) => {
      const indexOfAppointmentToUpdate = state.appointments.findIndex(appointmentForWhichToSetDateAndTime => {
        return appointmentForWhichToSetDateAndTime.appointmentId === action.payload.appointmentId;
      });
      state.appointments[indexOfAppointmentToUpdate].appointmentLastUpdatedOnDateTime = action.payload.systemDateTime;
    }}
})
export const { 
  addAppointment, 
  deleteAppointmentInReduxToolkit, 
  saveFromNotYetSubmittedAddAppointmentFormTheClientId, 
  saveFromNotYetSubmittedAddAppointmentFormTheTreatmentType,
  saveFromNotYetSubmittedAddAppointmentFormTheAppointmentPriority,
  saveFromNotYetSubmittedAddAppointmentFormTheDay,
  saveFromNotYetSubmittedAddAppointmentFormTheTime,
  saveFromNotYetSubmittedAddAppointmentFormTheDentistId,
  saveFromNotYetSubmittedAddAppointmentFormTheAssistantId,
  setDateAndTimeOfUpdateOfAppointmentInReduxToolkit
} = appointmentSlice.actions;

export default appointmentSlice.reducer;    

