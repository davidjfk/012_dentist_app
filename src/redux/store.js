import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import dentistReducer from "./dentistSlice";
import assistantReducer from "./assistantSlice";
import appointmentReducer from "./appointmentSlice";
import clientDayTimeReducer from "./clientDayTimeSlice";
import dentistDayTimeReducer from "./dentistDayTimeSlice";
import assistantDayTimeReducer from "./assistantDayTimeSlice";

export default configureStore({
  reducer: {
    client: clientReducer,
    dentist: dentistReducer,
    assistant: assistantReducer,
    appointment: appointmentReducer,
    clientDayTime: clientDayTimeReducer,
    dentistDayTime: dentistDayTimeReducer,
    assistantDayTime: assistantDayTimeReducer 
  }
});

