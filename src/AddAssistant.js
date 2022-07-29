import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAssistant } from "./redux/assistantSlice";
import "./App.css";

import {generateRandomPersonId} from './utils';

const AddAssistant = () => {
    const log = console.log;

    // log(`comp AddAssistant: start: `)

    let dispatch = useDispatch();
            const addAssistantToReduxToolkit = (newAssistant) => {
                dispatch(addAssistant(newAssistant));
            }

            useEffect(() => {
                // This is how to ADD a assistant, without using a form nor buttons:

                /*
                    winc requirement: none. 
                    I quickly reuse code (for adding a assistant) to be able to add assistants as well.

                    step 1: switch off the other components inside component Appointments. 
                    Reason: they both access the same data in redux toolkit with a useEffect with [] as a dependency.
                    step 2: uncomment this component inside component Appointments. 
                    step 3: npm start
                    step 4: chrome dev tools Redux: the new assistant below has been added to the assistant array inside state.

                    status: works, done.

                    In the bonus requirements I will use a form with a button to add a assistant, instead of using this useEffect hook

            
                */
                let lastName = "Helfer";
                let firstName = "Ayudante";

               let newAssistant = {
                    lastName,
                    assistantId:`${lastName}-${generateRandomPersonId()}`,
                    firstName,
                    phone:`06${Math.floor(10000000 + Math.random() * 90000000)}`,
                    email: `${firstName}.${lastName}@dentistcompanybvt.com`,
                    isSick:"false"
                }

                addAssistantToReduxToolkit(newAssistant);

                }, []
            );
         return null
} 


export default AddAssistant;