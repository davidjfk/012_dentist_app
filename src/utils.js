// remove imports after use case 1 has been completed. See fn generateRandomAppointment below.
import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"

import { addAppointment } from "./redux/appointmentSlice";
import {addDayTimeClient} from "./redux/clientDayTimeSlice";
import {addDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistant} from "./redux/assistantDayTimeSlice";



export function checkIfPersonWithDayAndTimeIsUnique (personId, day, time, personType, clientDayTimes, dentistDayTimes, assistantDayTimes) {
  // I only call this fn from within fn createAppointment.
  // 2do at the end (if time left): improve performance. Check useMemo( ). 
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




export const createCombiOfPersonAndDayAndTime = (personId, day, time) => personId + "_" + day + "_" + time;




export const generateRandomPersonId = () => Math.floor(1000000 + Math.random() * 900000); // 6 digits


export const getRandomDay = () => {
  /*
      winc-requirement: The practice is closed on the weekend.
      // status: I have updated fn getRandomDay, so now it complies with this requirement.
  */
  let randomDay = 6;
  while ([6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
    randomDay = Math.floor(Math.random() * 28) + 1;
    if (![6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
      if (randomDay < 10){
        randomDay = "0" + randomDay;
      }
      return randomDay.toString();
    } 
  }
  return randomDay
}
 
  
export const getRandomName = (personCategoryInCompanyBVT) => {
  const person = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
  return `${person["firstName"]} ${person["lastName"]}`;
};


export const getRandomPersonId = (personCategoryInCompanyBVT) => {
  /*
    in scope: use this fn in use case 1.
    out of scope: use case 0.
    personCategory is an array with either only randomly generated clients, dentists, or assistants.
    I have created the person categories in Mockaroo, as well as random person ids.
  */
  
  let person = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
  return person.personId;
};


export const getRandomPersonIdOld = (personCategoryInCompanyBVT) => {
  /*
    in scope: use this fn in use case 1.
    out of scope: use case 0.
    personCategory is an array with either only randomly generated clients, dentists, or assistants.
    I have created the person categories in Mockaroo, as well as random person ids.
  */
  
  let person = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
  return `${person["lastName"]}-${generateRandomPersonId()}`; 
};


export const getRandomPersonIdAsync = (personCategoryInCompanyBVT, typeOfPersonId) => {
  if (personCategoryInCompanyBVT[0]?.[typeOfPersonId] !== undefined) { 
      // personCategory is an array with either client, dentist or assistant objects. 
      // All 3 arrays contain more than 1 element, according to the requirements. 
      //console.log(clients[0])

      /*
        json data contains the personId, so do not create one with fn getRandomPersonId.
        E.g. do not: 
      
        let personId = getRandomPersonId(personCategoryInCompanyBVT);
        return personId
      */
      let randomPerson = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
      return randomPerson[typeOfPersonId];
      
  } else {
      console.log('react is busy retrieving data from redux-toolkit slice')
      // getRandomPersonIdAsync(personCategoryInCompanyBVT, typeOfPersonId) // not working, see below:
      let myInterval = setTimeout(function(){getRandomPersonIdAsync(personCategoryInCompanyBVT, typeOfPersonId)}, 100)
      // getRandomPersonIdAsync is sent to the callback queue, before its interval is cleared.
      clearTimeout(myInterval) 
      /* combi of setTimeout and clearTimeout are needed to prevent 'RangeError: Maximum call stack size exceeded'. 
        My trick: each previous callback fn "on the stack" is deleted right after the recursive fn call, so 
        you don't get a call stack overflow.  
      */
  }
}
 

 
export const getRandomPersons = (personCategoryInCompanyBVT, nrOfPersons) => {
  let randomPersons = [];
  for (let i = 0; i < nrOfPersons; i++) {
    let randomPerson = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
    randomPersons.push(randomPerson)
  };
  return randomPersons;
};


export const getRandomTime = () => {
  let hour;
  while (true) {
    hour = Math.floor(Math.random() * 24);
    if (hour > 7 && hour < 19) {
      if (hour < 10){
        hour = "0" + hour;
      }
      return hour.toString();
    }
  }
}; 


export const getRandomDay2 = () => {
  /*
      winc-requirement: The practice is closed on the weekend.
      // status: I have updated fn getRandomDay, so now it complies with this requirement.
  */
  let randomDay = 6;
  while ([6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
    randomDay = Math.floor(Math.random() * 28) + 1;
    if (![6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
      if (randomDay < 10){
        randomDay = "0" + randomDay;
      }
      return randomDay.toString();
    } 
  }
  return randomDay
}


export const isValidWorkingDay = (dayNumber) => (![6, 7, 13, 14, 20, 21, 27, 28].includes(dayNumber) ? true : false)


export const isValidWorkingTime = (hourNumber) => (hourNumber > 7 && hourNumber < 19 ? true : false)




export const generateRandomAppointmentId = () => Math.floor(10000000 + Math.random() * 9000000); // 7 digits

//2do: update this fn as part of use case 1. 
const generateRandomAppointmentFromWinc = () => ({
  appointmentId: generateRandomAppointmentId(), // appointmentId not part of the kick-start code. 
  day: getRandomDay(),
  time: getRandomTime(),
  client: getRandomName(clientsDentistCompanyBVT),
  dentist: getRandomName(dentistsDentistCompanyBVT),
  assistant: getRandomName(assistantsDentistCompanyBVT),
});

export const generateRandomAppointmentsFromWinc = num =>
  Array(num)
    .fill(0) // why fill with 0 before mapping? The undefineds are replaced by zeros, but why?
    /* see MDN ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array ): A JavaScript array is 
      initialized with the given elements, except in the case where a single argument is passed to the Array constructor and that 
      argument is a number (see the arrayLength parameter below). 
      imho: skip fill(0)
    */
    .map(_ => generateRandomAppointmentFromWinc());


  export const selectObjectsByArrayObjectKey  = (array, filterFunction) => {
      let filteredArr = array.filter(filterFunction)
      return filteredArr;
  }


  export function createAppointment (clientId, day, time, dentistId, isAssistantNeededForAppointment, assistantId, clientsFromReduxToolkit, dentistsFromReduxToolkit, assistantsFromReduxToolkit, clientDayTimes, dentistDayTimes, assistantDayTimes, dispatch) {
    let personType;
    // let dispatch; // dispatch must be declared as a variable. Otherwise not possible to put fn createAppointment inside this  file utils.js 
  
    if (isAssistantNeededForAppointment) {
        console.log(clientId)
        if (
            checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType="client",  clientDayTimes, dentistDayTimes, assistantDayTimes) &&
            checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = "dentist",  clientDayTimes, dentistDayTimes, assistantDayTimes) &&
            checkIfPersonWithDayAndTimeIsUnique(assistantId, day, time, personType = "assistant",  clientDayTimes, dentistDayTimes, assistantDayTimes)
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
            console.log(clientsFromReduxToolkit.clients)
            let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
            // variable client inside obj appointment is derived data from  the object client.
                               
            
            let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
            // console.log(client)
            // let client = "David Sneek";
  
            
            let getDentist = dentist => dentist.dentistId === dentistId
            // console.log(dentistId)
            let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
            // variable dentist inside obj appointment is derived data from  the object dentist.
            let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
            // console.log(dentist)
            // let dentist = "jan bakker"
  
            let getAssistant = assistant => assistant.assistantId === assistantId
            // console.log(assistantId)
            let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit.assistants, getAssistant)
            // variable assistant inside obj appointment is derived data from  the object assistant.
            
           
            let assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
            // console.log(assistant)
            // let assistant = "de boor"
  
            let appointmentId = generateRandomAppointmentId();
            let newAppointmentObject = {appointmentId, clientId, client, day, time, dentistId, dentist, assistantId, assistant, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
            dispatch(addAppointment(newAppointmentObject));
        } 
        else {            
            alert('please check if client, dentist and/or assistant have an appointment on this day and time');
            return;
        }
    } else {
        if (checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType = "client",  clientDayTimes, dentistDayTimes, assistantDayTimes) &&
            checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = "dentist",  clientDayTimes, dentistDayTimes, assistantDayTimes))
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
            let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
            // variable client inside obj appointment is derived data from  the object client.
            
            // let client = "david sneek"
            let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
            // console.log(client)
  
  
            let getDentist = dentist => dentist.dentistId === dentistId
            // console.log(dentistId)
            let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
            // variable dentist inside obj appointment is derived data from  the object dentist.
            
            // let dentist = "mr boor"
            let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
            //console.log(dentist)
  
            
            let appointmentId = generateRandomAppointmentId();
            let newAppointmentObject = {appointmentId, clientId, client, day, time, dentistId, dentist, assistantId:null, assistant:null, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
            dispatch(addAppointment(newAppointmentObject));
            
        }
        else {            
            alert('please check if client and/or dentist have an appointment on this day and time');
            return;
        }
    } 
  } // fn create Appointment
