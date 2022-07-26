import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";

import {createAppointment, getRandomPersonIdAsync, getRandomDay, getRandomTime } from './utils';

export const CreateAppointment = () => {
    const log = console.log;
    let clientsFromReduxToolkit  = useSelector((state) => state.client);
    let dentistsFromReduxToolkit  = useSelector((state) => state.dentist);
    let assistantsFromReduxToolkit  = useSelector((state) => state.assistant);

    let clientDayTimesFromReduxToolkit = useSelector((state) => state.clientDayTime);
    let dentistDayTimesFromReduxToolkit = useSelector((state) => state.dentistDayTime);
    let assistantDayTimesFromReduxToolkit = useSelector((state) => state.assistantDayTime);
    log(`comp createManualAppointmentAfterDentistAppHasStarted: get data from redux toolkit: `)

    let dispatch = useDispatch();


            useEffect(() => {
                // This is how to ADD dental appointments without using a form nor buttons:

                /*
                    winc requirement:
                    - add an appointment without an assistant: newState = addAppointment(state, dayNumber, time, patientId, dentistId) 
                    Note: an appointment on a day + time can only be added when the choosen dentist and/or assistant is available.

                    This is how to ADD a dental appointment without using a form nor buttons:
                    how to do it:
                    step 1: switch off the other components inside component Appointments. Reason: they both access the same data in redux toolkit with a useEffect with [] as a dependency.
                    step 2: activate this component. 

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
                log(`comp createManualAppointmentAfterDentistAppHasStarted: get random ids: `)
                // log(clientId)
                // log(dentistId)
                // log(assistantId)
                // or fill out any Id you like as a clientId, dentistId or assistantId, e.g. assistantId = "barryToTheRescue-03404";
                let isAssistantNeededForAppointment = true;
                
                createAppointment(
                    clientId, 
                    day, 
                    time, 
                    dentistId, 
                    isAssistantNeededForAppointment, 
                    assistantId, 
                    clientsFromReduxToolkit, 
                    dentistsFromReduxToolkit, 
                    assistantsFromReduxToolkit, 
                    clientDayTimesFromReduxToolkit, 
                    dentistDayTimesFromReduxToolkit, 
                    assistantDayTimesFromReduxToolkit, 
                    dispatch
                ); 
                
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
                
                createAppointment(
                    clientId, 
                    day, 
                    time, 
                    dentistId, 
                    isAssistantNeededForAppointment, 
                    assistantId, 
                    clientsFromReduxToolkit, 
                    dentistsFromReduxToolkit, 
                    assistantsFromReduxToolkit, 
                    clientDayTimesFromReduxToolkit, 
                    dentistDayTimesFromReduxToolkit, 
                    assistantDayTimesFromReduxToolkit, 
                    dispatch
                ); 
                
                // createAppointment(
                //     clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId, clientsFromReduxToolkit, dentistsFromReduxToolkit, assistantsFromReduxToolkit, clientDayTimes, dentistDayTimes, assistantDayTimes, dispatch); 
               
                /*
                    to prove that the validation works,  try to add another appointment with the same clientId, dentistId 
                    and assistantId on day 50 at 09 o'clock. (so uncomment the following and 'npm start' again)
                */
                //createAppointment(clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId); 
                // expected result: an alert with the message 'please check if client, dentist and/or assistant have an appointment on this day and time';


                }, []
            );
         return null
} 


