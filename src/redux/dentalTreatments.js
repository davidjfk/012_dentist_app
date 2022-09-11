import { createSlice } from "@reduxjs/toolkit";

export const dentalTreatmentListSlice = createSlice({
  name: "dentalTreatments",
  initialState: {
    dentalTreatments: []
  },
  reducers: {

    addDentalTreatmentsArrayFromExternalSource: (state, action) => {
      const dentalTreatmentToSave = action.payload; 
      state.dentalTreatments = dentalTreatmentToSave; 
    }}
})
export const { addDentalTreatmentsArrayFromExternalSource} = dentalTreatmentListSlice.actions;

export default dentalTreatmentListSlice.reducer;    

