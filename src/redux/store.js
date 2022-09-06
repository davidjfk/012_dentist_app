import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import dentistReducer from "./dentistSlice";
import dentalTreatmentReducer from "./dentalTreatments";
import assistantReducer from "./assistantSlice";
import appointmentReducer from "./appointmentSlice";
import clientDayTimeReducer from "./clientDayTimeSlice";
import dentistDayTimeReducer from "./dentistDayTimeSlice";
import assistantDayTimeReducer from "./assistantDayTimeSlice";
import updateAppointmentReducer from "./updateAppointmentSlice";
import saveLastSelectedDayInDayViewReducer from "./saveLastSelectedDayInDayView";

export default configureStore({
  reducer: {
    client: clientReducer,
    dentalTreatment: dentalTreatmentReducer,
    dentist: dentistReducer,
    assistant: assistantReducer,
    appointment: appointmentReducer,
    clientDayTime: clientDayTimeReducer,
    dentistDayTime: dentistDayTimeReducer,
    assistantDayTime: assistantDayTimeReducer, 
    updateAppointment: updateAppointmentReducer,
    saveLastSelectedDayInDayView: saveLastSelectedDayInDayViewReducer
  }
});

