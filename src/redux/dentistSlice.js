import { createSlice } from "@reduxjs/toolkit";
import {getDentistId, deleteDentalAppointment, selectObjectsByArrayObjectKey} from '../utils';

const log = console.log;
export const dentistListSlice = createSlice({
  name: "dentists",
  initialState: {
    dentists: []
  },
  reducers: {
    addDentist: (state, action) => {
      const dentistToSave = action.payload;
      state.dentists.push(dentistToSave);
    },
    addDentists: (state, action) => {
      const dentistsToSave = action.payload; 
      state.dentists = dentistsToSave; // dentistsToSave is an array with dentist objects.
    },
    setDentistToSick: (state, action) => {
      console.log('inside dentistList Slice:')
      let indexOfDentistInDentistArrayInReduxToolkit = action.payload; 
      state.dentists[indexOfDentistInDentistArrayInReduxToolkit].isSick = true; 

      console.log(typeof(indexOfDentistInDentistArrayInReduxToolkit) )



      // log( state.dentists)
      // log( state.dentists[indexOfDentistInDentistArrayInReduxToolkit])
      // state.dentists[indexOfDentistInDentistArrayInReduxToolkit].isSick = true;

      // console.log(dentistObjectOfWhichTheKeySickMustBeSetToTrue, indexOfDentistInDentistArrayInReduxToolkit )
    }}
})
export const { addDentist, addDentists, setDentistToSick } = dentistListSlice.actions;

export default dentistListSlice.reducer;    

