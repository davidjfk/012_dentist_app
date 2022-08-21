import { createSlice } from "@reduxjs/toolkit";
// import {getDentistId, deleteDentalAppointment, selectObjectsByArrayObjectKey} from '../utils';

const log = console.log;
export const dentistListSlice = createSlice({
  name: "dentists",
  initialState: {
    dentists: []
  },
  reducers: {
    // 2do: remove this action (this action is only used in file utils.js: fn addTreatmentTypesToDentist )
    addDentalTreatmentsAsSkillSetToDentist: (state, action) => {
      // const {skillsetOfDentist, indexOfDentistInArray} = action.payload;
      let skillSetOfDentist = action.payload.skillSetOfDentist;
      let indexOfDentistInArray = action.payload.indexOfDentistInArray;
      // log(skillsetOfDentist)
      state.dentists[indexOfDentistInArray].treatmentTypes = skillSetOfDentist;
    },
    // use_case_05_add_dentist
    addDentist: (state, action) => {
      // const dentistToSave = action.payload;
      const {dentistId, lastName, firstName, phone, email, treatmentTypes, isSick, skillLevel} = action.payload
      const dentistToSave = {dentistId, lastName, firstName, phone, email, treatmentTypes, isSick, skillLevel};      
      state.dentists.push(dentistToSave);
    },
    // use_case_00_create_mock_data
    addDentists: (state, action) => {
      const dentistsToSave = action.payload; 
      state.dentists = dentistsToSave; // dentistsToSave is an array with dentist objects.
    },
    // use_case_08_give_appointments_of_sick_dentist_a_red_background_color: as direct fn call without UI
    setDentistToSick: (state, action) => {
      // console.log('inside dentistList Slice:')
      let indexOfDentistInDentistArrayInReduxToolkit = action.payload; 
      state.dentists[indexOfDentistInDentistArrayInReduxToolkit].isSick = true; 
    },
    // use_case_08_give_appointments_of_sick_dentist_a_red_background_color: via UI
    toggleHealthStatusOfDentist: (state, action) => {
      console.log('in the redux-toolkit:')
      console.log(action.payload)
      const indexOfDentist = state.dentists.findIndex(dentistToToggleHealth => {
        return dentistToToggleHealth.dentistId === action.payload.dentistId;
      });
      log(`indexOfDentist: ${indexOfDentist}`)
      log(state.dentists[indexOfDentist].isSick = (action.payload.isSick))
    }}
})
export const {addDentalTreatmentsAsSkillSetToDentist, addDentist, addDentists, setDentistToSick, toggleHealthStatusOfDentist } = dentistListSlice.actions;

export default dentistListSlice.reducer;    

