import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addClient } from "./redux/clientSlice";
import "./App.css";

import {generateRandomPersonId} from './utils';

const AddClient = () => {
    const log = console.log;

    log(`comp AddDentist: start: `)

    let dispatch = useDispatch();
            const addClientToReduxToolkit = (newClient) => {
                dispatch(addClient(newClient));
            }

            useEffect(() => {
                // This is how to ADD a client, without using a form nor buttons:

                /*
                    winc requirement:
                    - add a client: newState = addDentist(state, "Toos", "Trekker", "06-12345678", "toos@tandartspraktijkbvt.nl")
                    
                    This is how to ADD a dental appointment without using a form nor buttons:
                    how to do it:
                    step 1: switch off the other components inside component Appointments. Reason: they both access the same data in redux toolkit with a useEffect with [] as a dependency.
                    step 2: uncomment this component inside component Appointments. 
                    step 3: npm start
                    step 4: chrome dev tools Redux: the new client below has been added to the client array inside state.

                    status: works, done.

                    In the bonus requirements I will use a form with a button to add a client, instead of using this useEffect hook

            
                */
                let lastName = "Bar";
                let firstName = "Foo";

               let newClient = {
                    lastName,
                    clientId: `${lastName}-${generateRandomPersonId()}`,
                    firstName,
                    phone:"06-61175862",
                    email: `${firstName}.${lastName}@dentistcompanybvt.com`,
                    birthYear: 2001,
                    isSick:"false"
                }

                addClientToReduxToolkit(newClient);

                }, []
            );
         return null
} 


export default AddClient;