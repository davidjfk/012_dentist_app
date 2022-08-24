import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {deleteDayTimeClient} from "./redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "./redux/assistantDayTimeSlice";
import {getClientId, deleteDentalAppointment, selectObjectsByArrayObjectKey} from './utils';
import "./App.css";

const log = console.log;


const DeleteAllAppointmentsOfClient = () => {

    let clientsfromReduxToolkit = useSelector((state) => state.client)
    let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
    let dispatch = useDispatch();

    useEffect(() => {
            /*
                This is how to DELETE all appointments of a client, without using a form nor buttons:

                winc requirement:
                - a client is sick, delete his appointments: newState = makePatientSick(state, patientId)
                

                step 1: switch off the other components inside component Appointments. 
                    Reason: they both access the same data in redux toolkit with a useEffect with [] as a dependency.
                step 2: uncomment this component inside component Appointments. 
                step 3: npm start
                step 4: expected output: chrome dev tools Redux: all appointments of this client have been deleted inside state.
                step 5: expected output: all appointments of the clientId have been deleted from Redux toolkit, Calendar view and Day view.
                status: works, done.

                In the bonus requirements I will use a form with a button to delete all appointments of a client, 
                instead of using this useEffect hook

        
            */                    


            /*
                starting point: in the UI: as a dentist or assistant on the client page (is a page where you can add a client and 
                look at an overview with all clients. Each client is a row in the client overview), I select a clientId inside a selectbox. Then
                I click a button 'cancel all appointments'. The event that is  triggered, contains a clientId.
                The UI part will be implemented as part of the bonus requirement. Until then I use this useEffect hook to call the fn
                that deletes all appointments of this clientId. 
            */ 

            // step: filter all appointment (objects) of this clientId inside the appointments array
            let clientIndexInClientsArray = 0 
            /*  
                select the  first client from the 50 randomly generated clients, or ad lib any other client from the 
                50 clients that are at this point in the system).
            */
            let clientId = getClientId(clientsfromReduxToolkit, clientIndexInClientsArray) 
            let getAppointment = appointment => appointment.clientId === clientId
            let appointmentsToDelete = selectObjectsByArrayObjectKey(appointmentsfromReduxToolkit.appointments, getAppointment)


            // step: for the sick client, delete each of its appointments: 
            appointmentsToDelete.forEach(appointmentToDelete => {
                console.log(appointmentToDelete);
                let appointmentIndexInAppointmentsArray = appointmentsfromReduxToolkit.appointments.indexOf(appointmentToDelete)
                log(appointmentIndexInAppointmentsArray)

                if (appointmentsToDelete.length !== 0){
                    deleteDentalAppointment(
                        appointmentsfromReduxToolkit, 
                        appointmentToDelete.appointmentId, 
                        appointmentIndexInAppointmentsArray, 
                        deleteDayTimeClient, 
                        deleteDayTimeDentist, 
                        deleteDayTimeAssistant, 
                        dispatch)  
                }
            })  

        },[]
    );
            return(
                <div>Delete all appointments of client</div>
            )
} 


export default DeleteAllAppointmentsOfClient
