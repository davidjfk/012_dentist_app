import { createSlice } from "@reduxjs/toolkit";
// import {getDentistId, deleteDentalAppointment, selectObjectsByArrayObjectKey} from '../utils';

const log = console.log;
export const dentistListSlice = createSlice({
  name: "dentists",
  initialState: {
    dentists: []
  },
  reducers: {
    addDentalTreatmentsAsSkillSetToDentist: (state, action) => {
      // const {skillsetOfDentist, indexOfDentistInArray} = action.payload;
      let skillSetOfDentist = action.payload.skillSetOfDentist;
      let indexOfDentistInArray = action.payload.indexOfDentistInArray;
      // log(skillsetOfDentist)
      state.dentists[indexOfDentistInArray].treatmentTypes = skillSetOfDentist;
    },
    addDentist: (state, action) => {
      const dentistToSave = action.payload;
      state.dentists.push(dentistToSave);
    },
    addDentists: (state, action) => {
      const dentistsToSave = action.payload; 
      state.dentists = dentistsToSave; // dentistsToSave is an array with dentist objects.
    },
    setDentistToSick: (state, action) => {
      // console.log('inside dentistList Slice:')
      let indexOfDentistInDentistArrayInReduxToolkit = action.payload; 
      state.dentists[indexOfDentistInDentistArrayInReduxToolkit].isSick = true; 
    }}
})
export const {addDentalTreatmentsAsSkillSetToDentist, addDentist, addDentists, setDentistToSick } = dentistListSlice.actions;

export default dentistListSlice.reducer;    

