import { createSlice } from "@reduxjs/toolkit";

export const clientListSlice = createSlice({
  name: "clients",
  initialState: {
    clients: []
  },
  reducers: {
    //  use_case_06_add_client
    addClient: (state, action) => {
      const clientToSave = action.payload;
      state.clients.push(clientToSave);
    },
    // use_case_00_create_mock_data
    addClients: (state, action) => {
      const clientsToSave = action.payload; 
      state.clients = clientsToSave; // clientsToSave is an array with client objects.
    },
    // not a winc requirement: 
    deleteClient: (state, action) => {
      const indexOfClientToDelete = state.clients.findIndex(clientToDelete => {
        return clientToDelete.clientId === action.payload.clientId;
      });
      state.clients.splice(indexOfClientToDelete, 1)
    },
    // not a winc requirement
    setDateAndTimeOfDeletionOfAppointmentsOfClientInReduxToolkit: (state, action) => {
      const indexOfClientToDelete = state.clients.findIndex(clientForWhomToSetDateAndTime => {
        return clientForWhomToSetDateAndTime.clientId === action.payload.clientId;
      });
      state.clients[indexOfClientToDelete].appointmentsDeletedOnDateTime = action.payload.systemDateTime;
    },
    // not a winc requirement
    toggleHealthStatusOfClient: (state, action) => {
      const indexOfClient = state.clients.findIndex(clientToToggleHealth => {
        return clientToToggleHealth.clientId === action.payload.clientId;
      });
      state.clients[indexOfClient].isSick = (action.payload.isSick)
    }}
})
export const { addClient, addClients, deleteClient, setDateAndTimeOfDeletionOfAppointmentsOfClientInReduxToolkit, toggleHealthStatusOfClient } = clientListSlice.actions;

export default clientListSlice.reducer;    

