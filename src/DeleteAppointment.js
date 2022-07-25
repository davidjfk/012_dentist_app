import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
// import { deleteAppointment } from "./redux/appointmentSlice";
import {deleteDayTimeClient} from "./redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "./redux/assistantDayTimeSlice";
// import {createCombiOfPersonAndDayAndTime, selectObjectsByArrayObjectKey } from './utils';
import {getAppointmentId, deleteDentalAppointment} from './utils';


const log = console.log;


const DeleteAppointment = () => {

    let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)

    let dispatch = useDispatch();

            useEffect(() => {
                /*
                    winc requirement:
                    - delete an appointment: newState = removeAppointment(state, appointmentId)
                
                    This is how to DELETE dental appointments without using a form nor buttons:
                    how to do it:
                    step 1: switch off components CreateManualAppointmentAfterDentistAppHasStarted. Reason: they both access the same data in redux toolkit with a useEffect with [] as a dependency.
                    step 2: (if needed) uncomment the following 3 lines of code:

                    // delete the first appointment, i.e. with index 0:
                */
                    
                    let appointmentIndexInAppointmentsArray = 0
                    let appointmentId = getAppointmentId(appointmentsfromReduxToolkit, appointmentIndexInAppointmentsArray) 
                    deleteDentalAppointment(appointmentsfromReduxToolkit, appointmentId, appointmentIndexInAppointmentsArray, deleteDayTimeClient, deleteDayTimeDentist, deleteDayTimeAssistant, dispatch)
                
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
                <div>Delete appointment</div>
            )

} 


export default DeleteAppointment