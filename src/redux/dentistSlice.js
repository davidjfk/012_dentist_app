import { createSlice } from "@reduxjs/toolkit";

export const dentistListSlice = createSlice({
  name: "dentists",
  initialState: {
    dentists: []
  },
  reducers: {
    // use_case_05_add_dentist
    addDentist: (state, action) => {
      const {dentistId, lastName, firstName, phone, email, treatmentTypes, isSick, skillLevel, appointmentsDeletedOnDateTime} = action.payload
      const dentistToSave = {dentistId, email, firstName, isSick, lastName, phone, skillLevel, treatmentTypes, appointmentsDeletedOnDateTime};      
      state.dentists.push(dentistToSave);
    },
    // use_case_00_create_mock_data
    addDentists: (state, action) => {
      const dentistsToSave = action.payload; 
      state.dentists = dentistsToSave; 
    },
    // not a winc requirement
    deleteDentist: (state, action) => {
      const indexOfDentistToDelete = state.dentists.findIndex(dentistToDelete => {
        return dentistToDelete.dentistId === action.payload.dentistId;
      });
      state.dentists.splice(indexOfDentistToDelete, 1)
    },
    // not a winc requirement
    setDateAndTimeOfDeletionOfAppointmentsOfDentistInReduxToolkit: (state, action) => {
      const indexOfDentistToDelete = state.dentists.findIndex(dentistForWhomToSetDateAndTime => {
        return dentistForWhomToSetDateAndTime.dentistId === action.payload.dentistId;
      });
      state.dentists[indexOfDentistToDelete].appointmentsDeletedOnDateTime = action.payload.systemDateTime;
    },
    // use_case_08_give_appointments_of_sick_dentist_a_red_background_color: as direct fn call without UI
    setDentistToSick: (state, action) => {
      let indexOfDentistInDentistArrayInReduxToolkit = action.payload; 
      state.dentists[indexOfDentistInDentistArrayInReduxToolkit].isSick = true; 
    },
    // use_case_08_give_appointments_of_sick_dentist_a_red_background_color: via UI
    toggleHealthStatusOfDentist: (state, action) => {
      const indexOfDentist = state.dentists.findIndex(dentistToToggleHealth => {
        return dentistToToggleHealth.dentistId === action.payload.dentistId;
      });
      state.dentists[indexOfDentist].isSick = (action.payload.isSick)
    }}
})
export const { addDentist, addDentists, deleteDentist, setDateAndTimeOfDeletionOfAppointmentsOfDentistInReduxToolkit, setDentistToSick, toggleHealthStatusOfDentist } = dentistListSlice.actions;

export default dentistListSlice.reducer;    

