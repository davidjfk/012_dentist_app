import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"

import { addClient } from "./redux/clientSlice";
import { addDentist } from "./redux/dentistSlice";
import { addAssistant } from "./redux/assistantSlice";
import { addAppointment } from "./redux/appointmentSlice";
import {addDayTimeClient} from "./redux/clientDayTimeSlice";
import {addDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistant} from "./redux/assistantDayTimeSlice";
import {addAppointsments} from "./redux/appointmentSlice";
import {checkIfPersonWithDayAndTimeIsUnique, createCombiOfPersonAndDayAndTime, generateRandomAppointmentId, getRandomPersonId, getRandomPersonIdAsync, getRandomDay, getRandomName, getRandomPersons, getRandomTime, selectObjectsByArrayObjectKey } from './utils';


import AddAppointment from "./AddAppointment";


import {Calendar} from "./Calendar";
import {Day} from "./Day";
import {generateRandomAppointmentsFromWinc} from "./utils";


const App = ()  => {
  
    const dispatch = useDispatch();
    // helper variables 
    let randomClients;
    let randomDentists;
    let randomAssistants;
  
      useEffect(() => {
          randomClients = getRandomPersons(clientsDentistCompanyBVT, 50);
          dispatch(addClient(randomClients));
      
          randomDentists = getRandomPersons(dentistsDentistCompanyBVT, 4);
          dispatch(addDentist(randomDentists));
      
          randomAssistants = getRandomPersons(assistantsDentistCompanyBVT, 2); 
          dispatch(addAssistant(randomAssistants));
      } , [] 
    );
    
    let clientDayTimes = useRef([]);
    let dentistDayTimes = useRef([]);
    let assistantDayTimes = useRef([]);
    
    function checkIfPersonWithDayAndTimeIsUnique (personId, day, time, personType) {
        let arrayWithDayAndTimeCombinationsThatAreTaken = [];
        let uniqueValue = false;
        switch (personType) {
            case 'client':
                arrayWithDayAndTimeCombinationsThatAreTaken = clientDayTimes.current; 
                break;
            case 'dentist':
                arrayWithDayAndTimeCombinationsThatAreTaken = dentistDayTimes.current; 
                break;
            case 'assistant':
                arrayWithDayAndTimeCombinationsThatAreTaken = assistantDayTimes.current; 
                break;
            default:
                console.error(`this ${personType} does not exist`)
                break;  
        }
        let PersonIdAndDayAndTimeCombi = personId +"_" + day + "_" + time;
        // console.log(PersonIdAndDayAndTimeCombi)
        uniqueValue = !arrayWithDayAndTimeCombinationsThatAreTaken.includes(PersonIdAndDayAndTimeCombi) 
        // console.log('fn checkIfPersonWithDayAndTimeIsUnique: return uniqueValue:')
        // console.log(uniqueValue)
        // console.log('fn checkIfPersonWithDayAndTimeIsUnique: return PersonIdAndDayAndTimeCombi:')
        // console.log(PersonIdAndDayAndTimeCombi)
        // console.log('fn checkIfPersonWithDayAndTimeIsUnique: return clientDayTimes.current:')
        // console.log(assistantDayTimes.current)
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
    
          let isAssistantNeededForAppointment = false;
          let randomNrThatDecidesIfAssistantMustBePresentAtAppointment = Math.random();
          if (randomNrThatDecidesIfAssistantMustBePresentAtAppointment < 0.99){    // arbitrary default value: < 0.4 
              isAssistantNeededForAppointment = true;
              assistantId = getRandomPersonIdAsync(randomAssistants, 'assistantId');
              // console.log(assistantId);
          } 
          
          if (isAssistantNeededForAppointment) {
              if (
                  checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType="client") &&
                  checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = "dentist") &&
                  checkIfPersonWithDayAndTimeIsUnique(assistantId, day, time, personType = "assistant")
                  )
              {
    
                  let objToDispatch;
                  objToDispatch = createCombiOfPersonAndDayAndTime(clientId, day, time)
                  // console.log(objToDispatch)
                  dispatch(addDayTimeClient(objToDispatch));
                  clientDayTimes.current.push(objToDispatch)
    
                  objToDispatch = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                  // console.log(objToDispatch)
                  dispatch(addDayTimeDentist(objToDispatch));
                  dentistDayTimes.current.push(objToDispatch)

                  objToDispatch = createCombiOfPersonAndDayAndTime(assistantId, day, time)
                  // console.log(objToDispatch)
                  dispatch(addDayTimeAssistant(objToDispatch));
                  assistantDayTimes.current.push(objToDispatch)

                  let getClient = client => client.clientId === clientId
                  // console.log(clientId)
                  let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomClients, getClient)
                  // variable client inside obj appointment is derived data from  the object client.
                  let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                  // console.log(client)


                  let getDentist = dentist => dentist.dentistId === dentistId
                  // console.log(dentistId)
                  let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomDentists, getDentist)
                  // variable dentist inside obj appointment is derived data from  the object dentist.
                  let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                  // console.log(dentist)

                  let getAssistant = assistant => assistant.assistantId === assistantId
                  // console.log(assistantId)
                  let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomAssistants, getAssistant)
                  // variable assistant inside obj appointment is derived data from  the object assistant.
                  let assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                  // console.log(assistant)

                  let appointmentId = generateRandomAppointmentId();
                  let newAppointmentObject = {appointmentId, clientId, client, day, time, dentistId, dentist, assistantId, assistant, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
                  dispatch(addAppointment(newAppointmentObject));
                  
              } else {
                  // console.log('the else way 1')
                  generateRandomAppointment(); 
                   
              } 
          } else {
              if (checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType = "client") &&
                  checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = "dentist"))
              {
    
                  let objToDispatch;
                  objToDispatch = createCombiOfPersonAndDayAndTime(clientId, day, time)
                  // console.log(objToDispatch)
                  dispatch(addDayTimeClient(objToDispatch));
                  clientDayTimes.current.push(objToDispatch)
    
                  objToDispatch = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                  // console.log(objToDispatch)
                  dispatch(addDayTimeDentist(objToDispatch));
                  dentistDayTimes.current.push(objToDispatch)

                  let getClient = client => client.clientId === clientId
                  // console.log(clientId)
                  let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomClients, getClient)
                  // variable client inside obj appointment is derived data from  the object client.
                  let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                  // console.log(client)


                  let getDentist = dentist => dentist.dentistId === dentistId
                  // console.log(dentistId)
                  let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomDentists, getDentist)
                  // variable dentist inside obj appointment is derived data from  the object dentist.
                  let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                  //console.log(dentist)

    
                  let appointmentId = generateRandomAppointmentId();
                  let newAppointmentObject = {appointmentId, clientId, client, day, time, dentistId, dentist, assistantId:null, assistant:null, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
                  dispatch(addAppointment(newAppointmentObject));
                    
              } else {   
                  // console.log('the else way 2')         
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
      
      Later, as part of the bonus requirements, inside component CreateManualAppointmentAfterDentistAppHasStarted I create a FORM to call fn createAppointment instead. 
      */ ///
    
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Add appointment</Link>
                </li>   
                <li>
                  <Link to="/deleteAppointment">Delete appointment</Link>
                </li>                        
                <li>
                  <Link to="/calendar">Calendar view</Link>
                </li>
                <li>
                  <Link to="/day">Day view</Link>
                </li>
              </ul>
            </nav>
            <main>
          

              <Switch>
                <Route path="/calendar">
                  <Calendar appointments={appointmentsfromReduxToolkit} />
                </Route>
                <Route path="/day">
                  <Day appointments={appointmentsfromReduxToolkit.appointments.filter(app => app.day === "02")} />
                </Route>
                <Route path="/deleteAppointment">  
                  <AddAppointment  />
                </Route>
                <Route path="/">
                  <AddAppointment  />
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
