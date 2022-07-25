import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


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
import {addAppointsments} from "./redux/appointmentSlice";
import {checkIfPersonWithDayAndTimeIsUnique, createCombiOfPersonAndDayAndTime, generateRandomAppointmentId, getRandomPersonId, getRandomPersonIdAsync, getRandomDay, getRandomName, getRandomPersons, getRandomTime, selectObjectsByArrayObjectKey } from './utils';


import AddAppointment from "./AddAppointment";


import {Calendar} from "./Calendar";
import {Day} from "./Day";
import {generateRandomAppointmentsFromWinc} from "./utils";

const CreateManualAppointmentAfterDentistAppHasStarted = () => {
    //     const [forceRerender, setForceRerender] = useState("this works")

    //     useEffect(() => {
    //             setForceRerender(...forceRerender)
    //          }, []
    //         );
    console.log('hi')
    let clientsFromReduxToolkit  = useSelector((state) => state.client);
    let dentistsFromReduxToolkit  = useSelector((state) => state.dentist);
    let assistantsFromReduxToolkit  = useSelector((state) => state.assistant);
    let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)

    //  appointmentsfromReduxToolkit.appointments.length === 150  &&   (

    const dispatch = useDispatch();
    // helper variables (of which the values need not persist between renders). 

    //

    //   console.log(clientsFromReduxToolkit.clients[0])
    //   let randomDentists;
    //   let randomAssistants;

    //     useEffect(() => {
    //         randomClients = getRandomPersons(clientsDentistCompanyBVT, 50);
    //         dispatch(addClient(randomClients));
        
    //         randomDentists = getRandomPersons(dentistsDentistCompanyBVT, 4);
    //         dispatch(addDentist(randomDentists));
        
    //         randomAssistants = getRandomPersons(assistantsDentistCompanyBVT, 2); 
    //         // interesting metric: with 1 assistant a max of  147 or 148 appointments is possible (in the 20 working days of next month), if the change of adding an assistant to an appointment is 40%. 
    //         dispatch(addAssistant(randomAssistants));
    //     } , [] 
    //   );
    
    let clientDayTimes = useRef([]);
    let dentistDayTimes = useRef([]);
    let assistantDayTimes = useRef([]);
    
    function checkIfPersonWithDayAndTimeIsUnique (personId, day, time, personType) {
        
        // 2do at the end (if time left): improve performance. Check useMemo( ). 
        let arrayWithDayAndTimeCombinationsThatAreTaken = [];
        let uniqueValue = false;
        switch (personType) {
            case 'client':
                arrayWithDayAndTimeCombinationsThatAreTaken = clientDayTimes.current; 
                break;
            case 'dentist':
                arrayWithDayAndTimeCombinationsThatAreTaken = dentistDayTimes.current; 
                break;
            case 'assistant':
                arrayWithDayAndTimeCombinationsThatAreTaken = assistantDayTimes.current; 
                break;
            default:
                console.error(`this ${personType} does not exist`)
                break;  
        }
        let PersonIdAndDayAndTimeCombi = personId +"_" + day + "_" + time;
        // console.log(PersonIdAndDayAndTimeCombi)
        uniqueValue = !arrayWithDayAndTimeCombinationsThatAreTaken.includes(PersonIdAndDayAndTimeCombi) 
        // console.log('fn checkIfPersonWithDayAndTimeIsUnique: return uniqueValue:')
        // console.log(uniqueValue)
        // console.log('fn checkIfPersonWithDayAndTimeIsUnique: return PersonIdAndDayAndTimeCombi:')
        // console.log(PersonIdAndDayAndTimeCombi)
        // console.log('fn checkIfPersonWithDayAndTimeIsUnique: return clientDayTimes.current:')
        // console.log(assistantDayTimes.current)
        return uniqueValue
    }

    
        
        function createAppointment (clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId) {
            let personType;

            if (isAssistantNeededForAppointment) {
                console.log(clientId)
                if (
                    checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType="client") &&
                    checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = "dentist") &&
                    checkIfPersonWithDayAndTimeIsUnique(assistantId, day, time, personType = "assistant")
                    )
                {
    
                    let objToDispatch;
                    objToDispatch = createCombiOfPersonAndDayAndTime(clientId, day, time)
                    // console.log(objToDispatch)
                    dispatch(addDayTimeClient(objToDispatch));
                    clientDayTimes.current.push(objToDispatch)
    
                    objToDispatch = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                    // console.log(objToDispatch)
                    dispatch(addDayTimeDentist(objToDispatch));
                    dentistDayTimes.current.push(objToDispatch)

                    objToDispatch = createCombiOfPersonAndDayAndTime(assistantId, day, time)
                    // console.log(objToDispatch)
                    dispatch(addDayTimeAssistant(objToDispatch));
                    assistantDayTimes.current.push(objToDispatch)

                    let getClient = client => client.clientId === clientId
                    // console.log(clientId)
                    console.log(clientsFromReduxToolkit.clients)
                    let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
                    // variable client inside obj appointment is derived data from  the object client.
                                       
                    
                    let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                    // console.log(client)
                    // let client = "David Sneek";

                    
                    let getDentist = dentist => dentist.dentistId === dentistId
                    // console.log(dentistId)
                    let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
                    // variable dentist inside obj appointment is derived data from  the object dentist.
                    let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                    // console.log(dentist)
                    // let dentist = "jan bakker"

                    let getAssistant = assistant => assistant.assistantId === assistantId
                    // console.log(assistantId)
                    let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit.assistants, getAssistant)
                    // variable assistant inside obj appointment is derived data from  the object assistant.
                    
                   
                    let assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                    // console.log(assistant)
                    // let assistant = "de boor"

                    let appointmentId = generateRandomAppointmentId();
                    let newAppointmentObject = {appointmentId, clientId, client, day, time, dentistId, dentist, assistantId, assistant, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
                    dispatch(addAppointment(newAppointmentObject));
                } 
                else {            
                    alert('please check if client, dentist and/or assistant have an appointment on this day and time');
                    return;
                }
            } else {
                if (checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType = "client") &&
                    checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = "dentist"))
                {
    
                    let objToDispatch;
                    objToDispatch = createCombiOfPersonAndDayAndTime(clientId, day, time)
                    // console.log(objToDispatch)
                    dispatch(addDayTimeClient(objToDispatch));
                    clientDayTimes.current.push(objToDispatch)
    
                    objToDispatch = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                    // console.log(objToDispatch)
                    dispatch(addDayTimeDentist(objToDispatch));
                    dentistDayTimes.current.push(objToDispatch)


                    let getClient = client => client.clientId === clientId
                    // console.log(clientId)
                    let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
                    // variable client inside obj appointment is derived data from  the object client.
                    
                    // let client = "david sneek"
                    let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                    // console.log(client)


                    let getDentist = dentist => dentist.dentistId === dentistId
                    // console.log(dentistId)
                    let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
                    // variable dentist inside obj appointment is derived data from  the object dentist.
                    
                    // let dentist = "mr boor"
                    let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                    //console.log(dentist)

    
                    let appointmentId = generateRandomAppointmentId();
                    let newAppointmentObject = {appointmentId, clientId, client, day, time, dentistId, dentist, assistantId:null, assistant:null, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
                    dispatch(addAppointment(newAppointmentObject));
                    
                }
                else {            
                    alert('please check if client and/or dentist have an appointment on this day and time');
                    return;
                }
            } 
        } // fn create Appointment
        
      
            useEffect(() => {
               
                /*
                    winc requirement:
                    - add an appointment without an assistant: newState = addAppointment(state, dayNumber, time, patientId, dentistId) 
                    Note: an appointment on a day + time can only be added when the choosen dentist and/or assistant is available.
                */
                let day = getRandomDay()  
                day="50"  
                /*
                    Day 50 is not in the upcoming month, but in the month after. So it is 100% sure that 
                    the first appointment with a randomly generated (or manually created ) clientId, dentistId and assitantId is valid and
                    will be added to the Calendar View and Day View.
                */
                let time = getRandomTime() 
                time="09"
                let clientId = getRandomPersonIdAsync(clientsFromReduxToolkit.clients, 'clientId')
                let dentistId = getRandomPersonIdAsync(dentistsFromReduxToolkit.dentists, 'dentistId');  
                let assistantId = getRandomPersonIdAsync(assistantsFromReduxToolkit.assistants, 'assistantId');
                // or fill out any Id you like as a clientId, dentistId or assistantId, e.g. assistantId = "barryToTheRescue-03404";
                let isAssistantNeededForAppointment = false;
                createAppointment(clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId); 
                /*
                    to prove that the validation works, try to add another appointment with the same clientId, dentistId 
                    and assistantId on day 50 at 09 o'clock. (so uncomment the following and 'npm start' again) 
                */
                //createAppointment(clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId); 
                // expected result: an alert with the message 'please check if client, dentist and/or assistant have an appointment on this day and time';

                
                /*
                    winc requirement:
                    - add an appointment with an assistant: newState = addAppointment(state, dayNumber, time, patientId, dentistId, assistentId)
                */
                isAssistantNeededForAppointment = true;
                day="51" // same comment as  for day 50 above. 
                createAppointment(clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId); 
                /*
                    to prove that the validation works,  try to add another appointment with the same clientId, dentistId 
                    and assistantId on day 50 at 09 o'clock. (so uncomment the following and 'npm start' again)
                */
                //createAppointment(clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId); 
                // expected result: an alert with the message 'please check if client, dentist and/or assistant have an appointment on this day and time';

                }, []
            );
         return null

} // end of component


export default CreateManualAppointmentAfterDentistAppHasStarted