import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setAssistantToSick} from "./redux/assistantSlice";
import {getAssistantId} from './utils';
import "./App.css";

const log = console.log;


const MakeOrangeBackgroundForAppointmentsOfSickAssistant = () => {

    // let clientsfromReduxToolkit = useSelector((state) => state.client)
    let assistantsfromReduxToolkit = useSelector((state) => state.assistant)

    let dispatch = useDispatch();

            useEffect(() => {
                /*
                    winc requirement:
                    - a assistant becomes sick. Give each of his or her appointments a red background
                     colour in the views: newState = makeAssistantSick(state, assistantId)
                
                    This is how to give all appointments of a sick assistant in the calendar view and day view a red background color:
                    step 1: switch off the other components inside component Appointments. 
                        Reason: they all access (partly) the same data in redux toolkit with a useEffect with [] as a dependency.
                    step 2: uncomment this component 'MakeRedBackgroundForAppointmentsOfSickAssistant' inside component Appointments. 
                    step 3: npm start
                    step 4: in calendar view and day view all appointments of the sick assistant have a red background color.

                    status: works, done.

                    In the bonus requirements I will use a form with a button to do the same, instead of using this useEffect hook

                */                  
                /*
                    I use this useEffect hook to set in the system that a assistant is ill. In the bonus requirements I will use a UI to do the same:       
                    
                    With a UI: as a assistant or assistant on a assistant page, I select a assistantId inside a selectbox. Then
                    I click a button 'set assistant to ill'. The event that is  triggered, contains the assistantId of the sick assistant.
                    
                    The UI part will be implemented as part of the bonus requirement. 
                */ 

                // step: filter a assistantId inside the (randomly created assistants inside the) assistant array (skip this step when implementing the bonus UI)
                let assistantIndexInAssistantsArray = 0 // select the  first assistant from the 4 randomly generated assistants.
                let assistantId = getAssistantId(assistantsfromReduxToolkit, assistantIndexInAssistantsArray) 

                // step: get indexOfAssistantInAssistantArrayInReduxToolkit
                let indexOfAssistantInAssistantArrayInReduxToolkit = assistantsfromReduxToolkit.assistants.findIndex( assistant => assistant.assistantId === assistantId)
                log(indexOfAssistantInAssistantArrayInReduxToolkit)
                dispatch(setAssistantToSick(indexOfAssistantInAssistantArrayInReduxToolkit));
            
                },[]
            );
            return(
                <div>Make Red Background For Appointments Of SickAssistant</div>
            )
} 


export default MakeOrangeBackgroundForAppointmentsOfSickAssistant
