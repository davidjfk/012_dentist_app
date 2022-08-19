import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";

import {createAppointment, getRandomPersonIdAsync, getRandomDay, getRandomTime, getRandomTreatmentForRandomAppointment } from './utils';

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
                    3 winc-requirements are tested inside this useEffect hook:
                
                    winc requirement 1of3:
                    - add an appointment WITHOUT an assistant: newState = addAppointment(state, dayNumber, time, patientId, dentistId) 
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
                log(`comp createManualAppointmentAfterDentistAppHasStarted: get random ids: `)
                let clientId = getRandomPersonIdAsync(clientsFromReduxToolkit.clients, 'clientId')
                let dentistId = getRandomPersonIdAsync(dentistsFromReduxToolkit.dentists, 'dentistId');  
                let assistantId = getRandomPersonIdAsync(assistantsFromReduxToolkit.assistants, 'assistantId');
                let treatmentType = getRandomTreatmentForRandomAppointment(dentistId, dentistsFromReduxToolkit.dentists );
                
                // or fill out any Id you like as a clientId, dentistId or assistantId, e.g. assistantId = "barryToTheRescue-03404";
                let isAssistantNeededForAppointment = false;
                
                createAppointment(
                    clientId, 
                    day, 
                    time, 
                    dentistId, 
                    treatmentType,
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
                    winc requirement 2of3:
                    - add an appointment WITH an assistant: newState = addAppointment(state, dayNumber, time, patientId, dentistId, assistentId)
                */
                isAssistantNeededForAppointment = true;
                day="51" // same comment as  for day 50 above. 
                time="10"
                createAppointment(
                    clientId, 
                    day, 
                    time, 
                    dentistId, 
                    treatmentType,
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
                    winc requirement 3of3:  
                    A dentist or assistant cannot have two appointments at the same time.
                /* 
                    How to test:
                    step 1: copy-paste the first or second createAppointment above into the testcase below.
                    step 2: make modifications (see testcase 1 below)
                    step 3: save
                    status: this file now contains 2 appointments with the same << "person"Id >> (can be dentistId, assistantId or clientId) and day and time. 
                    step 4: npm start

                    expected result for all testcases below: an alert with the message 'please check if client, dentist and/or assistant have an appointment on this day and time';

                    actual result: the 2 testcases run virtually at the same time, but there is not enough  time time write unique dentist-day-time combination from the first appointment to redux-toolkit (nor to read it from there). So the second appointment cannot check that there is already an appointment at the same day and time for this dentist.

                    When switching from this useEffect hook with [ ] as a dependency to using a form that emits an  event, I will run the  tests below.  
                */
                    
                /*
                    testcase 1: add another appointment with the SAME << dentistId >> on day 50 at 09 o'clock. 
                    (example: uncomment to test)
                */
                    // isAssistantNeededForAppointment = false;
                    // day="50" // same comment as  for day 50 above. 
                    // time="09"
                    // assistantId = getRandomPersonIdAsync(assistantsFromReduxToolkit.assistants, 'assistantId');
                    // clientId = getRandomPersonIdAsync(clientsFromReduxToolkit.clients, 'clientId')
                    // createAppointment(
                    //     clientId, 
                    //     day, 
                    //     time, 
                    //     dentistId, 
                    //     treatmentType,
                    //     isAssistantNeededForAppointment, 
                    //     assistantId, 
                    //     clientsFromReduxToolkit, 
                    //     dentistsFromReduxToolkit, 
                    //     assistantsFromReduxToolkit, 
                    //     clientDayTimesFromReduxToolkit, 
                    //     dentistDayTimesFromReduxToolkit, 
                    //     assistantDayTimesFromReduxToolkit, 
                    //     dispatch
                    // ); 
                /*
                    testcase 2: add another appointment with the SAME << assistentId >> on day 50 at 09 o'clock. 
                */

                /*
                    testcase 3: add another appointment with the SAME << dentistId >> on day 51 at 10 o'clock. 
                */

                /*
                    testcase 4: add another appointment with the SAME << assistentId >> on day 51 at 10 o'clock. 
                */


                /*
                    testcase 5: (not a winc requirement, but it makes sense that a client does not have 2 appointments at the same time either)
                    add another appointment with the SAME << clientId >> on day 50 at 09 o'clock. 
                */

                /*
                    testcase 6: (not a winc requirement, but it makes sense that a client does not have 2 appointments at the same time either)
                    add another appointment with the SAME << clientId >> on day 51 at 10 o'clock. 
                */


                }, []
            );
         return null
} 


