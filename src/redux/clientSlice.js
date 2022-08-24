import { createSlice } from "@reduxjs/toolkit";
const log = console.log;

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
      log('in the redux-toolkit: action deleteClient: ')
      log(action.payload.clientId)
      const indexOfClientToDelete = state.clients.findIndex(clientToDelete => {
        return clientToDelete.clientId === action.payload.clientId;
      });
      log(indexOfClientToDelete)
      state.clients.splice(indexOfClientToDelete, 1)
    },
    // not a winc requirement
    setDeleteDateAndTimeInReduxToolkit: (state, action) => {
      log('in the redux-toolkit: action setDeleteDateAndTimeInReduxToolkit: ')
      log(action.payload.systemDateTime)
      log(action.payload.clientId)
      const indexOfClientToDelete = state.clients.findIndex(clientForWhomToSetDateAndTime => {
        return clientForWhomToSetDateAndTime.clientId === action.payload.clientId;
      });

      log(indexOfClientToDelete)
      log(typeof(indexOfClientToDelete))
      state.clients[indexOfClientToDelete].appointmentsDeletedOnDateTime = action.payload.systemDateTime;
    },
    // not a winc requirement
    toggleHealthStatusOfClient: (state, action) => {
      // console.log('in the redux-toolkit:')
      // console.log(action.payload)
      const indexOfClient = state.clients.findIndex(clientToToggleHealth => {
        return clientToToggleHealth.clientId === action.payload.clientId;
      });
      log(`indexOfClient: ${indexOfClient}`)
      log(state.clients[indexOfClient].isSick = (action.payload.isSick))
      // log(state.assistants[indexOfClient].isSick = (!state.assistants[indexOfClient].isSick))
    }}
})
export const { addClient, addClients, deleteClient, setDeleteDateAndTimeInReduxToolkit, toggleHealthStatusOfClient } = clientListSlice.actions;

export default clientListSlice.reducer;    

