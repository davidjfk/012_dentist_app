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
import {createAppointment, checkIfPersonWithDayAndTimeIsUnique, createCombiOfPersonAndDayAndTime, generateRandomAppointmentId, getRandomPersonId, getRandomPersonIdAsync, getRandomDay, getRandomName, getRandomPersons, getRandomTime, selectObjectsByArrayObjectKey } from './utils';


import AddAppointment from "./AddAppointment";


import {Calendar} from "./Calendar";
import {Day} from "./Day";
import {generateRandomAppointmentsFromWinc} from "./utils";

const CreateManualAppointmentAfterDentistAppHasStarted = () => {
    console.log('hi')
    let clientsFromReduxToolkit  = useSelector((state) => state.client);
    let dentistsFromReduxToolkit  = useSelector((state) => state.dentist);
    let assistantsFromReduxToolkit  = useSelector((state) => state.assistant);
    // let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)

    let clientDayTimes = useRef([]);
    let dentistDayTimes = useRef([]);
    let assistantDayTimes = useRef([]);
    let dispatch = useDispatch();


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
                createAppointment(clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId, clientsFromReduxToolkit, dentistsFromReduxToolkit, assistantsFromReduxToolkit, clientDayTimes, dentistDayTimes, assistantDayTimes, dispatch); 
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
                createAppointment(clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId, clientsFromReduxToolkit, dentistsFromReduxToolkit, assistantsFromReduxToolkit, clientDayTimes, dentistDayTimes, assistantDayTimes, dispatch); 
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