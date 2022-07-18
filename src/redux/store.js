import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import dentistReducer from "./dentistSlice";
import assistantReducer from "./assistantSlice";

export default configureStore({
  reducer: {
    client: clientReducer,
    dentist: dentistReducer,
    assistant: assistantReducer
  }
});

/*
    
    
*/