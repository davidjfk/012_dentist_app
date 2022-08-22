import React from "react";
// import { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"
import dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists from "./dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists";

import { addClients } from "./redux/clientSlice";
import { addDentists } from "./redux/dentistSlice";
import { addAssistants } from "./redux/assistantSlice";

import {addDayTimeClient} from "./redux/clientDayTimeSlice";
import {addDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistant} from "./redux/assistantDayTimeSlice";
import {addAppointment } from "./redux/appointmentSlice";
// import {addAppointsments} from "./redux/appointmentSlice";
import {addDentalTreatmentsArrayFromExternalSource} from "./redux/dentalTreatments";
// import {addDentalTreatmentsAsSkillSetToDentist} from  "./redux/dentistSlice"

import {createCombiOfPersonAndDayAndTime, generateRandomAppointmentId, getRandomPersonIdAsync, getRandomDay, getRandomPersons, getRandomTime, selectObjectsByArrayObjectKey } from './utils';


import {Appointment} from "./Appointment";

import Assistant from "./components/assistant/Assistant";
import Client from "./components/client/Client";

import Dentist from "./components/dentist/Dentist";
import DeleteAppointment from "./DeleteAppointment";

import {Calendar} from "./components/monthView/Calendar";
import {SelectDayNrToDisplay} from "./components/dayView/SelectDayNrToDisplay";
// import {Day} from "./Day";
import {getRandomTreatmentForRandomAppointment, getRandomTreatmentTypes} from "./utils";

const log = console.log;

const App = ()  => {

    const dispatch = useDispatch();
    // helper variables 
    let randomClients;
    let randomDentists;
    let randomAssistants;
    // let dentistsFromReduxToolkit; // use dentistsWithTreatmentTypesRef instead, because of presumably latency.
    let dentistsWithTreatmentTypesRef = useRef([]); // see comment below for explanation. 


    // randomDentists = getRandomPersons(dentistsDentistCompanyBVT, 4);


      useEffect(() => {
          randomClients = getRandomPersons(clientsDentistCompanyBVT, 50);
          // log(`App.js inside start of useEffect:`)
          // log(randomClients)
          dispatch(addClients(randomClients));
      
          /*

          */
          randomDentists = getRandomPersons(dentistsDentistCompanyBVT, 4);
          // log(randomDentists)

          dentistsWithTreatmentTypesRef.current.push(randomDentists);
          // log(dentistsWithTreatmentTypesRef.current)
          //2do: put next 3 lines of code in a fn.
          for (let i = 0; i < 4; i++) {
            let skillSetOfDentist = getRandomTreatmentTypes(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists);
            dentistsWithTreatmentTypesRef.current[0][i].treatmentTypes = skillSetOfDentist;
          }

          // dispatch(addDentists(randomDentists));
          /*
            The array inside the ref 'dentistsWithTreatmentTypesRef' has been the single source of truth for the state
             with regard to the dentists inside the dentist array. 
             Now that each dentist has received (acquired :) ) a set of skills, this dentist array can be dispatched
             into redux-toolkit.
             After the following dispatch, redux toolkit will be the single source of truth for the dentist array:
          */
          dispatch(addDentists(dentistsWithTreatmentTypesRef.current[0]));
          /*
            To deal with / solve a latency issue, this ref 'dentistsWithTreatmentTypesRef' will be used inside
            fn generateRandomAppointment() <in read-only mode > to create the 150 appointments. 

          */

          // let skillSetOfDentist = getRandomTreatmentTypes(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists);
          // dentistsWithTreatmentTypesRef.current[0][0].treatmentTypes = skillSetOfDentist

          // skillSetOfDentist = getRandomTreatmentTypes(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists);
          // dentistsWithTreatmentTypesRef.current[0][1].treatmentTypes = skillSetOfDentist

          // skillSetOfDentist = getRandomTreatmentTypes(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists);
          // dentistsWithTreatmentTypesRef.current[0][2].treatmentTypes = skillSetOfDentist

          // skillSetOfDentist = getRandomTreatmentTypes(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists);
          // dentistsWithTreatmentTypesRef.current[0][3].treatmentTypes = skillSetOfDentist


          /* 
            following line will log array with 4 dentists. 
            QED: variable is accessible inside this useEffect.
            (compare with same log below  this useEffect)
          */
          // log(randomDentists)
      
          randomAssistants = getRandomPersons(assistantsDentistCompanyBVT, 2); 
          dispatch(addAssistants(randomAssistants));

          dispatch(addDentalTreatmentsArrayFromExternalSource(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists));
   
      } , [] 
    );


          // status: works (so now the treatment types inside each dentist object are accessible)
          // log(dentistsWithTreatmentTypesRef.current)



    /* goal: access the treatmentTypes inside the dentist objects, so I can add 1 random skill (=== treatmentType) to 
        each of the 150 randomly generated appoinments. The treatmentTypes are added to each dentist inside the useEffect hook above. 

        The code below does not (seem to) wait for code in useEffect hook to finish. 
        That is why e.g. following line will log undefined:
    */
      // log(randomDentists) 
    /*
        There is latency before the dentists from redux toolkit are accessible. The 3rd or 4th render shows the data.
    */
      //  dentistsFromReduxToolkit = useSelector((state) => state.dentist) 
      // log(dentistsFromReduxToolkit) 
        
    /*
      problem: not permissible to wait for the 3rd render: treatmentTypes must be added to each randomly-created-appointment during the 1st render ( React is relentless :) ).
      solution: I use a useRef instead, just like for e.g. clientDayTimesRef below. The needed variable dentistsWithTreatmentTypesRef must be declared before the useEffect hook  above, so it can be used inside the useEffect hook.  
    */

    // check if useRef from useEffect above works:  
    // log(dentistsWithTreatmentTypesRef)


    let clientDayTimesRef = useRef([]);
    let dentistDayTimesRef = useRef([]);
    let assistantDayTimesRef = useRef([]);
    
    function checkIfPersonWithDayAndTimeIsUniqueWithUseRef (personId, day, time, personType) {
        let arrayWithDayAndTimeCombinationsThatAreTaken = [];
        let uniqueValue = false;
        switch (personType) {
            case 'client':
                arrayWithDayAndTimeCombinationsThatAreTaken = clientDayTimesRef.current; 
                break;
            case 'dentist':
                arrayWithDayAndTimeCombinationsThatAreTaken = dentistDayTimesRef.current; 
                break;
            case 'assistant':
                arrayWithDayAndTimeCombinationsThatAreTaken = assistantDayTimesRef.current; 
                break;
            default:
                console.error(`this ${personType} does not exist`)
                break;  
        }
        let PersonIdAndDayAndTimeCombi = personId +"_" + day + "_" + time;
        uniqueValue = !arrayWithDayAndTimeCombinationsThatAreTaken.includes(PersonIdAndDayAndTimeCombi) 
        return uniqueValue
    }

    
        
      function generateRandomAppointment () {
          let assistantId;
          let clientId;
          let dentistId;
          let personType;
          let day = getRandomDay()  
          let time = getRandomTime() 
          clientId = getRandomPersonIdAsync(randomClients, 'clientId')
          dentistId = getRandomPersonIdAsync(randomDentists, 'dentistId');
          let treatmentType = getRandomTreatmentForRandomAppointment(dentistId, dentistsWithTreatmentTypesRef.current[0] )
          // log(treatmentType)

          let isAssistantNeededForAppointment = false;
          let randomNrThatDecidesIfAssistantMustBePresentAtAppointment = Math.random();
          if (randomNrThatDecidesIfAssistantMustBePresentAtAppointment < 0.99999){    // arbitrary default value: < 0.4 
              isAssistantNeededForAppointment = true;
              assistantId = getRandomPersonIdAsync(randomAssistants, 'assistantId');
              // console.log(assistantId);
          } 
          
          if (isAssistantNeededForAppointment) {
              if (
                  checkIfPersonWithDayAndTimeIsUniqueWithUseRef(clientId, day, time, personType="client") &&
                  checkIfPersonWithDayAndTimeIsUniqueWithUseRef(dentistId, day, time, personType = "dentist") &&
                  checkIfPersonWithDayAndTimeIsUniqueWithUseRef(assistantId, day, time, personType = "assistant")
                  )
              {
    
                  
                  let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
                  dispatch(addDayTimeClient(clientDayTimes));
                  clientDayTimesRef.current.push(clientDayTimes)
    
                  let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                  dispatch(addDayTimeDentist(dentistDayTimes));
                  dentistDayTimesRef.current.push(dentistDayTimes)

                  let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
                  dispatch(addDayTimeAssistant(assistantDayTimes));
                  assistantDayTimesRef.current.push(assistantDayTimes)

                  let getClient = client => client.clientId === clientId
                  let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomClients, getClient)
                  
                  // variable client inside obj appointment is derived data from  the object client.
                  let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

                  let getDentist = dentist => dentist.dentistId === dentistId
                  let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomDentists, getDentist)
                  
                  // variable dentist inside obj appointment is derived data from  the object dentist.
                  let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)

                  let getAssistant = assistant => assistant.assistantId === assistantId
                  let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomAssistants, getAssistant)
                  
                  // variable assistant inside obj appointment is derived data from  the object assistant.
                  let assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
      

                  // log(dentistsWithTreatmentTypesRef.current[0])

                  let appointmentId = generateRandomAppointmentId();
                  let newAppointmentObject = {
                    appointmentId, 
                    clientId, 
                    client, 
                    day, 
                    time, 
                    dentistId, 
                    dentist, 
                    treatmentType, 
                    assistantId, 
                    assistant, 
                    isSick:false, 
                    isNowUpdatingAppointment:false } 
                  dispatch(addAppointment(newAppointmentObject));
                  
              } else {
                  // console.log('the else way 1')
                  generateRandomAppointment(); 
                   
              } 
          } else {
              if (checkIfPersonWithDayAndTimeIsUniqueWithUseRef(clientId, day, time, personType = "client") &&
                  checkIfPersonWithDayAndTimeIsUniqueWithUseRef(dentistId, day, time, personType = "dentist"))
              {
    
                let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
                dispatch(addDayTimeClient(clientDayTimes));
                clientDayTimesRef.current.push(clientDayTimes)

                let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                dispatch(addDayTimeDentist(dentistDayTimes));
                dentistDayTimesRef.current.push(dentistDayTimes)

                let getClient = client => client.clientId === clientId
                let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomClients, getClient)
                
                // variable client inside obj appointment is derived data from  the object client.
                let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

                let getDentist = dentist => dentist.dentistId === dentistId
                let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomDentists, getDentist)
                
                // variable dentist inside obj appointment is derived data from  the object dentist.
                let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)

                let appointmentId = generateRandomAppointmentId();
                let newAppointmentObject = {appointmentId, clientId, client, day, time, dentistId, dentist, treatmentType, assistantId:null, assistant:null, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
                dispatch(addAppointment(newAppointmentObject));
                    
              } else {          
                  generateRandomAppointment();
              }
          } 
      }
          
          useEffect(() => {
                
                  const generateRandomAppointments = num => {
                    Array(num)
                        .fill(0) 
                        .map(_ => generateRandomAppointment());
                  }
                  generateRandomAppointments(150)
    
              } , [] 
          );
  
    let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
   
  return(
    
    
    <div>
     {(appointmentsfromReduxToolkit.appointments.length > 149 ) &&   
     /*
        When I switch from a useEffect hook to call the functions (e.g. to add or delete an appointment), to the bonus assignment to use instead  a form that calls the same function via an event,  then this line of code above must/can be deleted.
      /*
      
      I must be sure that the 4 dentists, 2 assistants, 50 clients and 150 appointments are in the system, BEFORE moving on with the next activity (e.g. making an appointment manually). 
      Reason: to make an appointment manually, I need to be able to select an EXISTING clientId (from the 50), dentistId (from the 4) and assistantId (from the 2). 

      In the code, both fns generateRandomAppointment (part of the code above) and CreateManualAppointmentAfterDentistAppHasStarted (to make an appointment manually) run inside a useEffect  hook with and run only once (with an empty [] as a dependency),  when the application starts. 
      
      I create a manual appointment by calling fn createAppointment “as a regular js fn”  inside component CreateManualAppointmentAfterDentistAppHasStarted. This only works in combination with an 'npm start'. See the comments inside the useEffect inside component CreateManualAppointmentAfterDentistAppHasStarted, for more info.
      
    
      So without this check   " (appointmentsfromReduxToolkit.appointments.length > 149 ) &&  "  they would run at the same time. 

      Status/ result: the fn createAppointment inside component CreateManualAppointmentAfterDentistAppHasStarted works. So 'USECASE 2: CREATE APPOINTMENT IN THE APPLICATION (AT FIRST WITH A FN CALL, LATER IN THE BONUS REQUIREMENT WITH A FORM)' is done. 
      
      Later, as part of the bonus requirements:
        inside component CreateManualAppointmentAfterDentistAppHasStarted I create a FORM to call fn createAppointment instead. 
        Component CreateRandomAppointmentsWhenAppStarts will then be the first component inside component Appointments.js and will contain all the code of this component App.js before the return statement above.    
      */ 
        
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">CRUD appointment</Link>
                </li>      
                <li>
                  <Link to="/calendar">Calendar view</Link>
                </li>
                <li>
                  <Link to="/day">Day view</Link>
                </li>
                <li>
                  <Link to="/client">Client</Link>
                </li>
                <li>
                  <Link to="/assistant">Assistant</Link>
                </li>
                <li>
                  <Link to="/dentist">Dentist</Link>
                </li>
              </ul>
            </nav>
            <main>
          
              <Switch>
                <Route path="/calendar">
                  <Calendar appointments={appointmentsfromReduxToolkit.appointments}  />
                </Route>
                <Route path="/deleteAppointment">  
                  <DeleteAppointment  />
                </Route>
                <Route path="/client">  
                  <Client  />
                </Route>
                <Route path="/assistant">  
                  <Assistant  />
                </Route>
                <Route path="/dentist">  
                  <Dentist  />
                </Route>
                <Route path="/day">
                  {/* <Day appointments={appointmentsfromReduxToolkit.appointments.filter(app => app.day === "03")} /> */}
                  {/* <Day appointments={appointmentsfromReduxToolkit.appointments} /> */}
                  <SelectDayNrToDisplay appointments={appointmentsfromReduxToolkit.appointments} />
                </Route>
                <Route path="/">
                  <Appointment />
                </Route>
              </Switch>
            </main>
          </div>
        </Router>
     }
  </div>

  );
  
};
export default App;
