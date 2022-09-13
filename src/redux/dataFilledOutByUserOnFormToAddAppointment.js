import { createSlice } from "@reduxjs/toolkit";

export const appointmentAddFormSlice = createSlice({
  name: "appointmentFormSlice",
  initialState: {
    dataFilledOutByUserOnFormToAddAppointment: {
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
    emptyAddAppointmentForm: (state) => {
      state.dataFilledOutByUserOnFormToAddAppointment.clientIdFromAddForm = "";
      state.dataFilledOutByUserOnFormToAddAppointment.treatmentTypeFromAddForm= '';
      state.dataFilledOutByUserOnFormToAddAppointment.appointmentPriorityFromAddForm='';
      state.dataFilledOutByUserOnFormToAddAppointment.dayFromAddForm='';
      state.dataFilledOutByUserOnFormToAddAppointment.timeFromAddForm='';
      state.dataFilledOutByUserOnFormToAddAppointment.dentistIdFromAddForm='';
      state.dataFilledOutByUserOnFormToAddAppointment.assistantIdFromAddForm='';
    },    
    saveFromNotYetSubmittedAddAppointmentFormTheClientId: (state, action) => {
      const clientIdFromAddForm = action.payload; 
      console.log(clientIdFromAddForm)
      state.dataFilledOutByUserOnFormToAddAppointment.clientIdFromAddForm = clientIdFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheTreatmentType: (state, action) => {
      const treatmentTypeFromAddForm = action.payload; 
      state.dataFilledOutByUserOnFormToAddAppointment.treatmentTypeFromAddForm = treatmentTypeFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheAppointmentPriority: (state, action) => {
      const appointmentPriorityFromAddForm = action.payload; 
      state.dataFilledOutByUserOnFormToAddAppointment.appointmentPriorityFromAddForm = appointmentPriorityFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheDay: (state, action) => {
      const dayFromAddForm = action.payload; 
      state.dataFilledOutByUserOnFormToAddAppointment.dayFromAddForm = dayFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheTime: (state, action) => {
      const timeFromAddForm = action.payload; 
      state.dataFilledOutByUserOnFormToAddAppointment.timeFromAddForm = timeFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheDentistId: (state, action) => {
      const dentistIdFromAddForm = action.payload; 
      state.dataFilledOutByUserOnFormToAddAppointment.dentistIdFromAddForm = dentistIdFromAddForm; 
    },
    saveFromNotYetSubmittedAddAppointmentFormTheAssistantId: (state, action) => {
      const assistantIdFromAddForm = action.payload; 
      state.dataFilledOutByUserOnFormToAddAppointment.assistantIdFromAddForm = assistantIdFromAddForm; 
    }}
})
export const { 
  emptyAddAppointmentForm,
  saveFromNotYetSubmittedAddAppointmentFormTheClientId, 
  saveFromNotYetSubmittedAddAppointmentFormTheTreatmentType,
  saveFromNotYetSubmittedAddAppointmentFormTheAppointmentPriority,
  saveFromNotYetSubmittedAddAppointmentFormTheDay,
  saveFromNotYetSubmittedAddAppointmentFormTheTime,
  saveFromNotYetSubmittedAddAppointmentFormTheDentistId,
  saveFromNotYetSubmittedAddAppointmentFormTheAssistantId,
} = appointmentAddFormSlice.actions;

export default appointmentAddFormSlice.reducer;    

