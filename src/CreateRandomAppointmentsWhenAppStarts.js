
import React from 'react'
// import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"
import { addClient } from "./redux/clientSlice";
import { addDentist } from "./redux/dentistSlice";
import { addAssistant } from "./redux/assistantSlice";
import { addAppointment } from "./redux/appointmentSlice";
import {addDayTimeClient} from "./redux/clientDayTimeSlice";
import {addDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistant} from "./redux/assistantDayTimeSlice";
// import {addAppointsments} from "./redux/appointmentSlice";
import { 
    createCombiOfPersonAndDayAndTime, 
    generateRandomAppointmentId, 
    getRandomPersonIdAsync, getRandomDay, getRandomPersons, getRandomTime, selectObjectsByArrayObjectKey } from './utils';


const CreateRandomAppointmentsWhenAppStarts = () => {
    
    
    const dispatch = useDispatch();

    let randomClients;
    let randomDentists;
    let randomAssistants;

    useEffect(() => {
        randomClients = getRandomPersons(clientsDentistCompanyBVT, 50);
        dispatch(addClient(randomClients));
    
        randomDentists = getRandomPersons(dentistsDentistCompanyBVT, 4);
        dispatch(addDentist(randomDentists));
    
        randomAssistants = getRandomPersons(assistantsDentistCompanyBVT, 2);
        dispatch(addAssistant(randomAssistants));
    } , [] 
);


    // helpervariables
    let clientDayTimes = [];
    let dentistDayTimes = [];
    let assistantDayTimes = [];

    function checkIfPersonWithDayAndTimeIsUnique (personId, day, time, personType) {
        // 2do at the end (if time left): improve performance of how to load data from global state into this fn. Use e.g. useMemo( ). 2do: investigate.
            let arrayWithDayAndTimeCombinationsThatAreTaken = [];
            let uniqueValue;
            switch (personType) {
                case 'client':
                    arrayWithDayAndTimeCombinationsThatAreTaken = clientDayTimes; 
                    break;
                case 'dentist':
                    arrayWithDayAndTimeCombinationsThatAreTaken = dentistDayTimes; 
                    break;
                case 'assistant':
                    arrayWithDayAndTimeCombinationsThatAreTaken = assistantDayTimes; 
                    break;
                default:
                    console.error(`this ${personType} does not exist`)
                    break;  
            }
            let PersonIdAndDayAndTimeCombi = personId +"_" + day + "_" + time;
            // console.log(PersonIdAndDayAndTimeCombi)
            uniqueValue = !arrayWithDayAndTimeCombinationsThatAreTaken.includes(PersonIdAndDayAndTimeCombi) 
            // console.log(uniqueValue)
            return uniqueValue
    }

 

    function generateRandomAppointment () {
        let assistantId;
        let clientId;
        let dentistId;
        let personType;
        let day = getRandomDay()  
        let time = getRandomTime() 
        clientId = getRandomPersonIdAsync(randomClients, 'clientId')
        dentistId = getRandomPersonIdAsync(randomDentists, 'dentistId');
        /*
        40% chance that appointment requires the presence of an assistant:
        */

        console.log('llalalalala')
        let isAssistantNeededForAppointment = false;
        let randomNrThatDecidesIfAssistantMustBePresentAtAppointment = Math.random();
        if (randomNrThatDecidesIfAssistantMustBePresentAtAppointment < 0.999){    // reset to < 0.4 later. 
            isAssistantNeededForAppointment = true;
            assistantId = getRandomPersonIdAsync(randomAssistants, 'assistantId');
            // console.log(assistantId);
        } 
        // console.log(`isAssistantNeededForAppointment: ${isAssistantNeededForAppointment}`)
        
        if (isAssistantNeededForAppointment) {
            if (checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType="client") &&
                checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = "dentist") &&
                checkIfPersonWithDayAndTimeIsUnique(assistantId, day, time, personType = "assistant"))
            {

                let objToDispatch;
                objToDispatch = createCombiOfPersonAndDayAndTime(clientId, day, time)
                // console.log(objToDispatch)
                dispatch(addDayTimeClient(objToDispatch));

                objToDispatch = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                // console.log(objToDispatch)
                dispatch(addDayTimeDentist(objToDispatch));

                objToDispatch = createCombiOfPersonAndDayAndTime(assistantId, day, time)
                // console.log(objToDispatch)
                dispatch(addDayTimeAssistant(objToDispatch));

                

                let getClient = client => client.clientId === clientId
                let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomClients, getClient)
                let {firstName, lastName} = clientForWhomAnAppointmentIsBeingMade
                console.log('jo')
                console.log(firstName)

                // get clientObj with the random clientId
                // create obj-appointment-property client  --> firstName plus LastName    // derived data !!!

                // create obj-appointment-property dentist --> firstName plus LastName    // derived data !!!

                // create obj-appointment-property assistant  --> firstName plus LastName    // derived data !!!


                // add client, dentist and assistant to the appointment object.

                let appointmentId = generateRandomAppointmentId();
                let newAppointmentObject = {appointmentId, clientId, day, time, dentistId, assistantId, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
                dispatch(addAppointment(newAppointmentObject));
                
            } else {
                generateRandomAppointment();
            } 
        } else {
            if (checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType = "client") &&
                checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = "dentist"))
            {

                let objToDispatch;
                objToDispatch = createCombiOfPersonAndDayAndTime(clientId, day, time)
                // console.log(objToDispatch)
                dispatch(addDayTimeClient(objToDispatch));

                objToDispatch = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                // console.log(objToDispatch)
                dispatch(addDayTimeDentist(objToDispatch));

                // get clientObj with the random clientId
                // create obj-appointment-property client  --> firstName plus LastName    // derived data !!!

                // create obj-appointment-property dentist --> firstName plus LastName    // derived data !!!


                // add client, dentist and assistant to the appointment object.

                let appointmentId = generateRandomAppointmentId();
                let newAppointmentObject = {appointmentId, clientId, day, time, dentistId, assistantId:null, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
                dispatch(addAppointment(newAppointmentObject));
                  
            } else {            
                generateRandomAppointment();
            }
        } 
    }
 
        useEffect(() => {
                const generateRandomAppointments = num =>
                Array(num)
                    .fill(0) 
                    .map(_ => generateRandomAppointment());

                generateRandomAppointments(150)
            } , [] 
        );
       
        const appointments = useSelector((state) => state.appointment)
        console.log(`inside comp: ${appointments}`)
        console.log(appointments)
    return (
        <div>CreateRandomAppointmentsWhenAppStarts</div>
    )
}

export default CreateRandomAppointmentsWhenAppStarts

