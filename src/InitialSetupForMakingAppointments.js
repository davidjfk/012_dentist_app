import React from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import { addClient } from "./redux/clientSlice";
import { addDentist } from "./redux/dentistSlice";
import { addAssistant } from "./redux/assistantSlice";
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"
import {getRandomPersons} from "./utils"
 

const InitialSetupForMakingAppointments = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        /* 
           Extra feature: make the nr of persons (e.g. '150') for all person categories configurable on a
           config page (so you could e.g. choose 100 instead).
        */
        let randomlySelectedClients = getRandomPersons(clientsDentistCompanyBVT, 150);
        dispatch(addClient(randomlySelectedClients));

        let randomlySelectedDentists = getRandomPersons(dentistsDentistCompanyBVT, 4);
        dispatch(addDentist(randomlySelectedDentists));

        let randomlySelectedAssistants = getRandomPersons(assistantsDentistCompanyBVT, 2);
        dispatch(addAssistant(randomlySelectedAssistants));

        } , [] 
    );
        /*
            known "bug/ particular behavior": useEffect hook runs twice in React 18's Strict mode.
            So in chrome dev tools everything is being logged twice in a console.log below (instead of just once).
            Introduced in March of 2022.
            https://www.techiediaries.com/react-18-useeffect/
        */
 
        const clientsFromReduxToolkit = useSelector((state) => state.client);
        // proof of concept: log the clients.
        console.log(clientsFromReduxToolkit.clients)

        const dentistsFromReduxToolkit = useSelector((state) => state.dentist);
        // proof of concept: log the dentists.
        console.log(dentistsFromReduxToolkit.dentists)

        const assistantsFromReduxToolkit = useSelector((state) => state.assistant);
        // proof of concept: log the assistants.
        console.log(assistantsFromReduxToolkit.assistants)

        /*
            this is the endpoint of feature branch create_mock_data. The data above will be used in the next feature feature branch 'create_150_random_dentist_appointments'.
        */
    return (
        <div>InitialSetupForMakingAppointments</div>


  )
}

export default InitialSetupForMakingAppointments