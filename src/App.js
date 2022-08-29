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
import appointmentPriorityLevelsAsScalarsInArray from "./dataInDentistAppWhenDentistAppStarts/appointmentPriorityLevelsAsScalarsInArray";

import {addClients } from "./redux/clientSlice";
import {addDentists } from "./redux/dentistSlice";
import {addAssistants } from "./redux/assistantSlice";
import {addDayTimeClient} from "./redux/clientDayTimeSlice";
import {addDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistant} from "./redux/assistantDayTimeSlice";
import {addAppointment } from "./redux/appointmentSlice";
// import {addAppointsments} from "./redux/appointmentSlice";
import {addDentalTreatmentsArrayFromExternalSource} from "./redux/dentalTreatments";
// import {addDentalTreatmentsAsSkillSetToDentist} from  "./redux/dentistSlice"

import {createCombiOfPersonAndDayAndTime, generateAppointmentId, getNrOfRandomElementsFromArray, getRandomPersonId, getRandomDay, getRandomPersons, getRandomUniqueObjectsFromArray, getRandomTime, selectObjectsByArrayObjectKey } from './utils';


import {UseEffectHookCalls} from "./UseEffectHookCalls";
import Appointment from "./components/appointment/Appointment";
import Assistant from "./components/assistant/Assistant";
import Client from "./components/client/Client";
import Dentist from "./components/dentist/Dentist";
import {Calendar} from "./components/monthView/Calendar";
import {SelectDayNrToDisplay} from "./components/dayView/SelectDayNrToDisplay";
import {getRandomTreatmentForRandomAppointment, getRandomTreatmentTypes} from "./utils";
import InitalDataSetup from "./Initial_Data_Setup";

const log = console.log;

const App = ()  => {

    const dispatch = useDispatch();
    // helper variables (only accessible inside the useEffect hook below)
    let randomClients;
    let randomDentists;
    let randomAssistants;
    let dentistsWithTreatmentTypesRef = useRef([]); // see comment below for explanation. 

    let chanceThatAppointmentNeedsAsssistant = 0.5;  
    /*  value between 0 (included) and 1 (included). 
        The bigger the nr, the bigger the chance that the automatically generated appointment requires the precence of an assistant.
    */
    let nrOfAssistants = 4; 
    let nrOfRandomGeneratedAppointments = 3;
    let nrOfClients = 5;
    let nrOfDentists = 4; 
    let nrOfDifferentTreatmentsAsTheSkillsOfADentist = 12;

    useEffect(() => {
        randomClients = getRandomUniqueObjectsFromArray(clientsDentistCompanyBVT, nrOfClients);
        dispatch(addClients(randomClients));
        randomDentists = getRandomUniqueObjectsFromArray(dentistsDentistCompanyBVT, nrOfDentists);
        /*
          problem 1: "no time to go up-and-down to redux-toolkit"
          while this useEffect hook runs (with [] as a dependency) while the application starts, (e.g.) the array with dentists cannot be dispatched into redux-toolkit and obtained from redux-toolkit, so next, a set of treatmentTypes can be connected to each dentist in the array. Reason: the useEffect hook runs during the first render, but the "dispatching-and-getting" from redux-toolkit runs during the same first render in parallel as well (and possibly takes a few more renders to complete). So the data to-and-from redux-toolkit is not available quickly enough to be of use inside this useEffect-hook.
          
          solution: this ref 'dentistsWithTreatmentTypesRef' will be used inside comp App instead of the "round-about" to redux-toolkit. 
          dentistsWithTreatmentTypesRef will do 2 things:
          1. The array inside the ref 'dentistsWithTreatmentTypesRef' will be used to add a random set of treatmentTypes (skills) to each dentist. After that this array will be dispatched into redux-toolkit. From that moment on redux-toolkit will be the single source of truth for the array with dentists (and their skills nested into each dentist object).
          2. In fn generateRandomAppointment() below <in read-only mode!! > dentistsWithTreatmentTypesRef is used to add a treatmentType to each of the 150 appointments that must be created. 

          alternative solution: add the treatmentTypes below to the helper variable randomDentists. Then dispatch(addDentists(randomDentists)); Then access the dentist data from redux-toolkit below this useEffect-hook, instead of accessing the dentist data from useRef dentistsWithTreatmentTypesRef.
        */
        dentistsWithTreatmentTypesRef.current.push(randomDentists);

        for (let i = 0; i < 4; i++) {
          let skillSetOfDentist = getRandomTreatmentTypes(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists, nrOfDifferentTreatmentsAsTheSkillsOfADentist);
          dentistsWithTreatmentTypesRef.current[0][i].treatmentTypes = skillSetOfDentist;
        }
        dispatch(addDentists(dentistsWithTreatmentTypesRef.current[0]));
    
        randomAssistants = getRandomUniqueObjectsFromArray(assistantsDentistCompanyBVT, nrOfAssistants); 
        dispatch(addAssistants(randomAssistants));

        dispatch(addDentalTreatmentsArrayFromExternalSource(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists));
  
      } , [] 
    );
    /* 
      note to self: 
      goal: access the treatmentTypes inside the dentist objects, so I can add 1 random skill (=== treatmentType) to 
      each of the 150 randomly generated appoinments inside fn generateAppointment() below. (A set of random treatmentTypes have just been added to each dentist inside the useEffect hook above). 

      problem 2:following line will log undefined, because randomDentists is a helper variable.  useRef nor useState are used to make this variable persist across re-renders. 
    */ 
      // log(randomDentists);
    /*  
      solution: use useRef, just like for e.g. clientDayTimesRef below. 
      status: the useRef from useEffect above works, so now the treatment types inside each dentist object are accessible (after the 3rd render).
        log(dentistsWithTreatmentTypesRef)
    */
      // log(dentistsWithTreatmentTypesRef.current)
    
    let clientDayTimesRef = useRef([]);
    let dentistDayTimesRef = useRef([]);
    let assistantDayTimesRef = useRef([]);
    
    function isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment (personId, day, time, personType) {
        let arrayWithDayAndTimeCombinationsThatAreTaken = [];
        let isUniqueValue = false;
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
        isUniqueValue = !arrayWithDayAndTimeCombinationsThatAreTaken.includes(PersonIdAndDayAndTimeCombi) 
        return isUniqueValue;
    }
        
    function generateRandomAppointment () {
        let assistantId;
        let clientId;
        let dentistId;
        let personType;
        let day = getRandomDay()  
        let time = getRandomTime() 
        clientId = getRandomPersonId(randomClients, 'clientId')
        dentistId = getRandomPersonId(randomDentists, 'dentistId');
        let treatmentType = getRandomTreatmentForRandomAppointment(dentistId, dentistsWithTreatmentTypesRef.current[0] )
        // log(treatmentType)

        let isAssistantNeededForAppointment = false;
        let randomNrThatDecidesIfAssistantMustBePresentAtAppointment = Math.random();
        if (randomNrThatDecidesIfAssistantMustBePresentAtAppointment < chanceThatAppointmentNeedsAsssistant){    
            isAssistantNeededForAppointment = true;
            assistantId = getRandomPersonId(randomAssistants, 'assistantId');
            // console.log(assistantId);
        } 
        
        if (isAssistantNeededForAppointment) {
            if (
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(clientId, day, time, personType="client") &&
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(dentistId, day, time, personType = "dentist") &&
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(assistantId, day, time, personType = "assistant")
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

                // let appointmentId = generateRandomAppointmentId();
                let appointmentId = generateAppointmentId(clientId, day, time);
                let appointmentPriority = getNrOfRandomElementsFromArray(appointmentPriorityLevelsAsScalarsInArray, 1).toString();
                let appointmentLastUpdatedOnDateTime = null;

                let newAppointmentObject = {
                  appointmentId, 
                  appointmentPriority,
                  assistantId, 
                  appointmentLastUpdatedOnDateTime,
                  assistant, 
                  client, 
                  clientId, 
                  day, 
                  dentist, 
                  dentistId, 
                  isNowUpdatingAppointment:false,
                  time, 
                  treatmentType
                }; 
                dispatch(addAppointment(newAppointmentObject));
                
            } else {
                // console.log('the else way 1')
                generateRandomAppointment(); 
                  
            } 
        } else {
            if (isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(clientId, day, time, personType = "client") &&
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(dentistId, day, time, personType = "dentist"))
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

              // let appointmentId = generateRandomAppointmentId();
              let appointmentId = generateAppointmentId(clientId, day, time);
              let appointmentPriority = getNrOfRandomElementsFromArray(appointmentPriorityLevelsAsScalarsInArray, 1).toString();
              let appointmentLastUpdatedOnDateTime = null;


              let newAppointmentObject = {
                appointmentId, 
                appointmentPriority,
                assistantId:null, 
                assistant:null, 
                appointmentLastUpdatedOnDateTime,
                client, 
                clientId, 
                day, 
                dentist, 
                dentistId, 
                isNowUpdatingAppointment:false,
                time, 
                treatmentType
              };
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
                generateRandomAppointments(nrOfRandomGeneratedAppointments)
  
            } , [] 
        );

  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
  
  // log(appointmentsfromReduxToolkit.appointments.length)
   
  return(
    
    <div>
     {(appointmentsfromReduxToolkit.appointments.length >= 0 ) &&   
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
                  <Link to="/">Calendar view</Link>
                </li>
                <li>
                  <Link to="/day">Day view</Link>
                </li>
                <li>
                  <Link to="/appointment">Appointment</Link>
                </li> 
                <li>
                  <Link to="/assistant">Assistant</Link>
                </li>
                <li>
                  <Link to="/client">Client</Link>
                </li>
                <li>
                  <Link to="/dentist">Dentist</Link>
                </li>
                <li>
                  <Link to="/useEffectHookCalls">useEffect-hook-calls</Link>
                </li>
              </ul>
            </nav>
            <main>
          
              <Switch>
                <Route path="/client">  
                  <Client  />
                </Route>
                <Route path="/assistant">  
                  <Assistant  />
                </Route>
                <Route path="/dentist">  
                  <Dentist  />
                </Route>
                <Route path="/appointment">  
                  <Appointment  />
                </Route>
                <Route path="/day">
                  {/* <Day appointments={appointmentsfromReduxToolkit.appointments.filter(app => app.day === "03")} /> */}
                  {/* <Day appointments={appointmentsfromReduxToolkit.appointments} /> */}
                  <SelectDayNrToDisplay appointments={appointmentsfromReduxToolkit.appointments} />
                </Route>
                <Route path="/useEffectHookCalls">
                  <UseEffectHookCalls />
                </Route>
                <Route path="/">
                  <Calendar appointments={appointmentsfromReduxToolkit.appointments}  />
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
