import { createSlice } from "@reduxjs/toolkit";
// import {getDentistId, deleteDentalAppointment, selectObjectsByArrayObjectKey} from '../utils';

// const log = console.log;
export const dentalTreatmentListSlice = createSlice({
  name: "dentalTreatments",
  initialState: {
    dentalTreatments: []
  },
  reducers: {

    addDentalTreatmentsArrayFromExternalSource: (state, action) => {
      const dentalTreatmentToSave = action.payload; 
      state.dentalTreatments = dentalTreatmentToSave; 
      /*
        track & trace: dentalTreatmentToSave is an array with dental treatments (e.g. brace, bridge, etc.). 
        Inside App.js this array is loaded from file dentalTreatments.js
      */
    }}
})
export const { addDentalTreatmentsArrayFromExternalSource} = dentalTreatmentListSlice.actions;

export default dentalTreatmentListSlice.reducer;    

