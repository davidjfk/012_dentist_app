import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
import {deleteAppointmentInReduxToolkit} from "./redux/appointmentSlice";
import {deleteDayTimeClient} from "./redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "./redux/assistantDayTimeSlice";
import { createAppointment, getAppointmentId, getAppointmentObject, deleteDentalAppointment, getRandomTreatmentForRandomAppointment} from './utils';

const log = console.log;

const UpdateAppointment = () => {
    let clientsFromReduxToolkit  = useSelector((state) => state.client);
    let dentistsFromReduxToolkit  = useSelector((state) => state.dentist);
    let assistantsFromReduxToolkit  = useSelector((state) => state.assistant);
    let appointmentsfromReduxToolkit = useSelector((state) => state.appointment);

    let clientDayTimesFromReduxToolkit = useSelector((state) => state.clientDayTime);
    let dentistDayTimesFromReduxToolkit = useSelector((state) => state.dentistDayTime);
    let assistantDayTimesFromReduxToolkit = useSelector((state) => state.assistantDayTime);
    log(`comp createManualAppointmentAfterDentistAppHasStarted: get data from redux toolkit: `)

    let tempPlaceToSaveAppointmentThatIsAboutToBeDeleted = useRef({});

    let dispatch = useDispatch();

            useEffect(() => {
                /*
                    winc requirement:
                    - move an appointment: newState = moveAppointment(state, appointmentId, newDayNumber, newTime) 
                    Note: dentists and assistants can't have two appointments simultaneously.
                
                    This is how to UPDATE a dental appointment without using a form nor buttons:
                    how to do it:
                    step 1: switch off the other components inside component Appointments. Reason: they both access the same data in redux toolkit with a useEffect with [] as a dependency.
                    step 2: delete an appointment (of which the data will  be used to create an updated version  of  this appointment). If needed, uncomment the following 3 lines of code:

                */
                    let appointmentIndexInAppointmentsArray = 1; // update the second appointment (is a random choice).
                    let appointmentId = getAppointmentId(appointmentsfromReduxToolkit, appointmentIndexInAppointmentsArray) 
                    let appointmentObject = getAppointmentObject(appointmentsfromReduxToolkit, appointmentIndexInAppointmentsArray) 
                    log(`comp UpdateAppointment: object that is about to be updated: `)
                    // log(appointmentObject)



                    tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current = appointmentObject
                    // appointment is saved in useRef, so it can safely be deleted from global state.
                    log(tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current)

                    // remark: in the bonus requirement I will get the appointmentId from the event object.

                    // put the info from the useRef into the fn call createAppointment below (in the bonus requirement this info will then be shown to the user in a form)
                    // in bonus requirement: instead of useRef, put the appointmentThatIsAboutToBeUpdated in redux-toolkit slice. From there load the data into the component UpdateAppointment. Comp UpdateAppointment is conditionally rendered with  a boolean. 

                    
                    // delete the appointment-to-update from global state, so any adjustment can be made (e.g. reschedule to other dentist, move to other day and/or time, etc.)
                    deleteDentalAppointment(
                        appointmentsfromReduxToolkit, 
                        appointmentId, 
                        deleteAppointmentInReduxToolkit, 
                        deleteDayTimeClient, 
                        deleteDayTimeDentist, 
                        deleteDayTimeAssistant, 
                        dispatch
                    )
                

                    /*
                        add info of useRef to fn createAppointment, EXCEPT for the values that need to be changed.  Add hard-coded values for what needs to be changed:
                        E.g.: if the old day was 3, but the  new day 4, then  the property day will be filled with a "hard-coded" 4, instead of refering to data from useRef)
                    */

                    log(`comp UpdateAppointment: object assembly place: `)
                    
                    let clientId = tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current.clientId;
                    log(`clientId: ${clientId}`)


                    let appointmentPriority = 'high';

                    let day = tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current.day;
                    day = 70;
                    log(`day: ${day}`)
                    let time = tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current.time;
                    time = 21;
                    log(`time: ${time}`)
                    let dentistId = tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current.dentistId;
                    log(`dentistId: ${dentistId}`)
                    
                    log(tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current.assistantId)
                    let isAssistantNeededForAppointment = tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current.assistantId ? true: false
                    log(`isAssistantNeededForAppointment: ${isAssistantNeededForAppointment}`)
                    
                    let assistantId;
                    if (tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current.assistantId) {
                        assistantId = tempPlaceToSaveAppointmentThatIsAboutToBeDeleted.current.assistantId
                    } else {
                        assistantId = null;
                    }
                    log(`assistantId: ${assistantId}`)
                    let treatmentType = getRandomTreatmentForRandomAppointment(dentistId, dentistsFromReduxToolkit.dentists );

                    let isNowUpdatingAppointment = false;
                    let appointmentLastUpdatedOnDateTime = null;

                    createAppointment(
                        clientId, 
                        treatmentType,
                        appointmentPriority,
                        day, 
                        time, 
                        dentistId, 
                        assistantId, 
                        isAssistantNeededForAppointment, 
                        appointmentLastUpdatedOnDateTime,
                        isNowUpdatingAppointment,  
                        clientsFromReduxToolkit, 
                        dentistsFromReduxToolkit, 
                        assistantsFromReduxToolkit, 
                        clientDayTimesFromReduxToolkit, 
                        dentistDayTimesFromReduxToolkit, 
                        assistantDayTimesFromReduxToolkit, 
                        dispatch
                    ) 
                 

                /*
                    step 3: npm start
                    step 4: on home page, click on link 'delete appointment'
                    step 5: refresh the url

                    expected output: the appointment with the given index has been deleted from Redux toolkit, Calendar view and Day view.
                    actual output: same, done.

                    after the test: comment out the lines of code of step 2, and then 'npm start' again. 

                    This fn deleteDentalAppointment can be run in conjunction with fn createAppointment. Fn createAppointment can be (de)activated by commenting out component CreateManualAppointmentAfterDentistAppHasStarted inside component  AddAppointment. 

                */
                
                /*
                    status: fn deleteDentalAppointment works.  ==> in the bonus requirements this fn will be called with a form. 
                */
                
                },[]
            );
            return(
                <div>Update appointment</div>
            )

} 


export default UpdateAppointment
