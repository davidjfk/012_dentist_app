import { createSlice } from "@reduxjs/toolkit";

export const clientListSlice = createSlice({
  name: "clients",
  initialState: {
    clients: []
  },
  reducers: {
    addClient: (state, action) => {
      const clientToSave = action.payload;
      state.clients.push(clientToSave);
    },
    addClients: (state, action) => {
      const clientsToSave = action.payload; 
      state.clients = clientsToSave; // clientsToSave is an array with client objects.
    }}
})
export const { addClient, addClients } = clientListSlice.actions;

export default clientListSlice.reducer;    

