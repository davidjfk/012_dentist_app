import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addDentist } from "./redux/dentistSlice";
import "./App.css";

import {generateRandomPersonId} from './utils';

const AddDentist = () => {
    const log = console.log;

    log(`comp AddDentist: start: `)

    let dispatch = useDispatch();
            const addDentistToReduxToolkit = (newDentist) => {
                dispatch(addDentist(newDentist));
            }

            useEffect(() => {
                // This is how to ADD a dentist, without using a form nor buttons:

                /*
                    winc requirement:
                    - add a dentist: newState = addDentist(state, "Toos", "Trekker", "06-12345678", "toos@tandartspraktijkbvt.nl")
                    
                    This is how to ADD a dental appointment without using a form nor buttons:
                    how to do it:
                    step 1: switch off the other components inside component Appointments. Reason: they both access the same data in redux toolkit with a useEffect with [] as a dependency.
                    step 2: uncomment this component inside component Appointments. 
                    step 3: npm start
                    step 4: chrome dev tools Redux: the new dentist below has been added to the dentist array inside state.

                    status: works, done.

                    In the bonus requirements I will use a form with a button to add a dentist, instead of using this useEffect hook

            
                */
                let lastName = "More";
                let firstName = "Less";

               let newDentist = {
                    lastName,
                    dentistId:`${lastName}-${generateRandomPersonId()}`,
                    firstName,
                    phone:`06${Math.floor(10000000 + Math.random() * 90000000)}`,
                    email: `${firstName}.${lastName}@dentistcompanybvt.com`,
                    treatmentTypes:[],
                    isSick:"false"
                }

                addDentistToReduxToolkit(newDentist);

                }, []
            );
         return null
} 


export default AddDentist;