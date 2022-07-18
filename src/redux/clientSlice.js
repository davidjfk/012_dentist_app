import { createSlice } from "@reduxjs/toolkit";

export const clientListSlice = createSlice({
  name: "clients",
  initialState: {
    clients: []
  },
  reducers: {
    addClient: (state, action) => {
      const randomClientsFromMockaroo = action.payload;
      state.clients.push(...randomClientsFromMockaroo);
    }}
})
export const { addClient } = clientListSlice.actions;

export default clientListSlice.reducer;    

