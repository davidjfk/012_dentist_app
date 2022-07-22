import React from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"
import { addClient } from "./redux/clientSlice";
import { addDentist } from "./redux/dentistSlice";
import { addAssistant } from "./redux/assistantSlice";

import {getRandomPersons} from "./utils"
import {addDayTimeClient} from "./redux/clientDayTimeSlice";


const InitialSetupForMakingAppointments = () => {
    // const dispatch = useDispatch();
    
    
    // const clients = useSelector((state) => state.afspraak)
    // console.log(`inside comp InitialSetupForMakingAppointments: ${clients}`)
    // console.log(clients)
     

    // const appointments = useSelector((state) => state.appointment)
    // console.log(`inside comp InitialSetupForMakingAppointments: ${appointments}`)
    // console.log(appointments)

    useEffect(() => {
        /*
            known "bug/ particular behavior": useEffect hook runs twice in React 18's Strict mode.
            So in chrome dev tools everything is being logged twice in a console.log below (instead of just once).
            Introduced in March of 2022.
            https://www.techiediaries.com/react-18-useeffect/
        */

        /* 
           Extra feature: make the nr of persons (e.g. '150') for all person categories configurable on a
           config page (so you could e.g. choose 100 instead).
        */
        // let randomlySelectedClients = getRandomPersons(clientsDentistCompanyBVT, 150);
        // dispatch(addClient(randomlySelectedClients));

        // let randomlySelectedDentists = getRandomPersons(dentistsDentistCompanyBVT, 4);
        // dispatch(addDentist(randomlySelectedDentists));

        // let randomlySelectedAssistants = getRandomPersons(assistantsDentistCompanyBVT, 2);
        // dispatch(addAssistant(randomlySelectedAssistants));


        } , [] 
    );

 
        // const clientsFromReduxToolkit = useSelector((state) => state.client);
        // console.log(clientsFromReduxToolkit.clients)

        // const dentistsFromReduxToolkit = useSelector((state) => state.dentist);
        // console.log(dentistsFromReduxToolkit.dentists)

        // const assistantsFromReduxToolkit = useSelector((state) => state.assistant);
        // console.log(assistantsFromReduxToolkit.assistants)






    
    return (
        <div>InitialSetupForMakingAppointments</div>


  )
}

export default InitialSetupForMakingAppointments