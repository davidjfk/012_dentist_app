import { createSlice } from "@reduxjs/toolkit";

export const daySlice = createSlice({
  name: "dayToSaveInDayView",
  initialState: {
    day: '01'
  },
  reducers: {
    // not a winc requirement
    /* usecase: as a user in Day View I select a daynr (e.g. daynr 10). Then I click on another tab (e.g. Client page or Appointment page). 
      After this I click on tab Day View again. Expected result: Day View opens on the "last day" (daynr 10). 

    */
    saveLastSelectedDayInDayView: (state, action) => {
      const dayToSave = action.payload.toString(); 
      state.day = dayToSave; 
    }}

})
export const { saveLastSelectedDayInDayView} = daySlice.actions;

export default daySlice.reducer;    

