import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setDentistToSick} from "./redux/dentistSlice";
import {getDentistId} from './utils';
import "./App.css";

const log = console.log;


const MakeRedBackgroundForAppointmentsOfSickDentist = () => {

    // let clientsfromReduxToolkit = useSelector((state) => state.client)
    let dentistsfromReduxToolkit = useSelector((state) => state.dentist)

    let dispatch = useDispatch();

            useEffect(() => {
                /*
                    winc requirement:
                    - a dentist becomes sick. Give each of his or her appointments a red background
                     colour in the views: newState = makeDentistSick(state, dentistId)
                
                    This is how to give all appointments of a sick dentist in the calendar view and day view a red background color:
                    step 1: switch off the other components inside component Appointments. 
                        Reason: they all access (partly) the same data in redux toolkit with a useEffect with [] as a dependency.
                    step 2: uncomment inside component Appointments:
                        a) this component MakeRedBackgroundForAppointmentsOfSickDentist
                        b) component MakeOrangeBackgroundForAppointmentsOfSickAssistant.
                    step 3: npm start
                    step 4: in calendar view and day view all appointments of the sick dentist have a red background color.

                    status: works, done.

                    In the bonus requirements I will use a form with a button to do the same, instead of using this useEffect hook

                */                  
                /*
                    I use this useEffect hook to set in the system that a dentist is ill. In the bonus requirements I will use a UI to do the same:       
                    
                    With a UI: as a dentist or assistant on a dentist page, I select a dentistId inside a selectbox. Then
                    I click a button 'set dentist to ill'. The event that is  triggered, contains the dentistId of the sick dentist.
                    
                    The UI part will be implemented as part of the bonus requirement. 
                */ 

                // step: filter a dentistId inside the (randomly created dentists inside the) dentist array (skip this step when implementing the bonus UI)
                let dentistIndexInDentistsArray = 0 // select (ad lib) the  first dentist from the 4 randomly generated dentists.
                let dentistId = getDentistId(dentistsfromReduxToolkit, dentistIndexInDentistsArray) 

                // step: get indexOfDentistInDentistArrayInReduxToolkit
                let indexOfDentistInDentistArrayInReduxToolkit = dentistsfromReduxToolkit.dentists.findIndex( dentist => dentist.dentistId === dentistId)
                log(indexOfDentistInDentistArrayInReduxToolkit)
                dispatch(setDentistToSick(indexOfDentistInDentistArrayInReduxToolkit));
            
                },[]
            );
            return(
                <div>Make Red Background For Appointments Of SickDentist</div>
            )
} 


export default MakeRedBackgroundForAppointmentsOfSickDentist
