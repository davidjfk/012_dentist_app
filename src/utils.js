// remove imports after use case 1 has been completed. See fn generateRandomAppointment below.
import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"

import { addAppointment, deleteAppointment } from "./redux/appointmentSlice";
import {addDayTimeClient} from "./redux/clientDayTimeSlice";
import {addDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistant} from "./redux/assistantDayTimeSlice";
import {addDentalTreatmentsAsSkillSetToDentist} from  "./redux/dentistSlice"

const log = console.log;

export function checkIfPersonWithDayAndTimeIsUnique (
  personId, 
  day, 
  time, 
  personType, 
  clientDayTimesFromReduxToolkit, 
  dentistDayTimesFromReduxToolkit, 
  assistantDayTimesFromReduxToolkit) {
  // I only call this fn from within fn createAppointment.
  // 2do at the end (if time left): improve performance. Check useMemo( ). 
  
  log(`fn checkIfPersonWithDayAndTimeIsUnique: start: `)
  // log(personId)
  // log(day)
  // log(time)
  // log(personType)  
  // log(clientDayTimes.clientDayTimes)
  // log(dentistDayTimes.dentistDayTimes)
  // log(assistantDayTimes.assistantDayTimes)
  let uniqueValue = false;
  let PersonIdAndDayAndTimeCombi = personId +"_" + day + "_" + time;
  switch (personType) {
      case 'client':
          uniqueValue = !clientDayTimesFromReduxToolkit.clientDayTimes.includes(PersonIdAndDayAndTimeCombi) 
          break;
      case 'dentist':
          uniqueValue = !dentistDayTimesFromReduxToolkit.dentistDayTimes.includes(PersonIdAndDayAndTimeCombi) 
          break;
      case 'assistant':
          log(assistantDayTimesFromReduxToolkit.assistantDayTimes)
          uniqueValue = !assistantDayTimesFromReduxToolkit.assistantDayTimes.includes(PersonIdAndDayAndTimeCombi) 
          break;
      default:
          console.error(`this ${personType} does not exist`)
          break;  
  }
  
  return uniqueValue
}


export const addTreatmentTypesToDentist = (arrayWithDentistObjects, arrayWithDentalTreatments, dispatch) => {
  for (let i = 0; i < arrayWithDentistObjects.length; i++) {
    dispatch(addDentalTreatmentsAsSkillSetToDentist({"skillSetOfDentist": getRandomTreatmentTypes(arrayWithDentalTreatments), "indexOfDentistInArray": i}))
  }
}



export const createCombiOfPersonAndDayAndTime = (personId, day, time) => personId + "_" + day + "_" + time;


export const generateRandomPersonId = () => Math.floor(1000000 + Math.random() * 900000); // 6 digits


export function getAppointmentObject(appointmentsfromReduxToolkit, indexOfAppointment) {
  const appointmentObject = appointmentsfromReduxToolkit.appointments[indexOfAppointment]
  log('fn getAppointmentObject: start:')
  console.log('appointmentThatWillBeDeleted:')
  console.log(appointmentObject)
  log('fn getAppointmentObject: end.')
  return appointmentObject
}

export function getAppointmentId(appointmentsfromReduxToolkit, indexOfAppointment) {
  const appointment = appointmentsfromReduxToolkit.appointments[indexOfAppointment]
  log('fn getAppointmentId: start:')
  console.log('appointmentThatWillBeDeleted:')
  console.log(appointment)
  let appointmentId = appointment.appointmentId
  log('fn getAppointmentId: end.')
  return appointmentId
}

export function getAssistantId(assistantsfromReduxToolkit, indexOfAssistant) {
  const assistant = assistantsfromReduxToolkit.assistants[indexOfAssistant]
  log('fn getAssistantId: start:')
  console.log(assistant)
  let assistantId = assistant.assistantId
  log('fn getAssistantId: end.')
  return assistantId
}

export function getClientId(clientsfromReduxToolkit, indexOfClient) {
  const client = clientsfromReduxToolkit.clients[indexOfClient]
  log('fn getClientId: start:')
  console.log(client)
  let clientId = client.clientId
  log('fn getClientId: end.')
  return clientId
}

export function getDentistId(dentistsfromReduxToolkit, indexOfDentist) {
  const dentist = dentistsfromReduxToolkit.dentists[indexOfDentist]
  log('fn getDentistId: start:')
  console.log(dentist)
  let dentistId = dentist.dentistId
  log('fn getDentistId: end.')
  return dentistId
}

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







export const getRandomTreatmentForRandomAppointment = (dentistId, dentistArray) => {
  
  // log(dentistId)
  let getDentistObject = dentist => dentist.dentistId === dentistId
  let dentistObject = selectObjectsByArrayObjectKey(dentistArray, getDentistObject)
  
  const randomCurrentSkillOfDentist = dentistObject[0].treatmentTypes[Math.floor(Math.random() * dentistObject[0].treatmentTypes.length)];
  // log(randomCurrentSkillOfDentist)

  let currentSkillSetOfDentist = dentistObject;
  // log(dentistObject)
  return randomCurrentSkillOfDentist;
};








export const getRandomTreatmentTypes = (completeArrayWithDentalTreatments, nrOfDifferentTreatmentsAsTheSkillsOfADentist = 8) => {
  let selectionOfDentalTreatments = [];
  
  while (selectionOfDentalTreatments.length < nrOfDifferentTreatmentsAsTheSkillsOfADentist){
    let dentalTreatment = completeArrayWithDentalTreatments[Math.floor(Math.random() * completeArrayWithDentalTreatments.length)];
   
   
      if (!selectionOfDentalTreatments.includes(dentalTreatment)){
        selectionOfDentalTreatments.push(dentalTreatment)
      }
  }
  return selectionOfDentalTreatments.sort();
};


export const isValidWorkingDay = (dayNumber) => (![6, 7, 13, 14, 20, 21, 27, 28].includes(dayNumber) ? true : false)


export const isValidWorkingTime = (hourNumber) => (hourNumber > 7 && hourNumber < 19 ? true : false)




export const generateRandomAppointmentId = () => Math.floor(10000000 + Math.random() * 9000000); // 7 digits

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


  export function createAppointment (
    clientId, 
    day, 
    time, 
    dentistId, 
    treatmentType,
    isAssistantNeededForAppointment, 
    assistantId, 
    clientsFromReduxToolkit, 
    dentistsFromReduxToolkit, 
    assistantsFromReduxToolkit, 
    clientDayTimesFromReduxToolkit, 
    dentistDayTimesFromReduxToolkit, 
    assistantDayTimesFromReduxToolkit, 
    dispatch
    ) {
      log(`fn createAppointment: start: `)
    let personType;
    
    
    log(`dentist stuffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`)  
    let getDentist = dentist => dentist.dentistId === dentistId
    let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)  
    let skillsOfDentistForWhomAnAppointmentIsBeingMade = (dentistForWhomAnAppointmentIsBeingMade[0].treatmentTypes)
    log(skillsOfDentistForWhomAnAppointmentIsBeingMade)
    if(skillsOfDentistForWhomAnAppointmentIsBeingMade.includes(treatmentType)) {
      log(`Dentist ${dentistId} has the required skill to treat client ${clientId} `) // 
    } else {
      log(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `)
      alert(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `);
      return; // abort creating appointment. 
    } 

    log(`isAssistantNeededForAppointment: ${isAssistantNeededForAppointment}`)
    if (isAssistantNeededForAppointment) {
        log(clientId, dentistId, treatmentType, assistantId, day, time, clientDayTimesFromReduxToolkit, dentistDayTimesFromReduxToolkit, assistantDayTimesFromReduxToolkit )
        

        if (
            checkIfPersonWithDayAndTimeIsUnique(
              clientId, 
              day, 
              time, 
              personType="client",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit) &&
            checkIfPersonWithDayAndTimeIsUnique(
              dentistId, 
              day, 
              time, 
              personType = "dentist",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit) &&
            checkIfPersonWithDayAndTimeIsUnique(
              assistantId, 
              day, 
              time, 
              personType = "assistant",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)
            )
        {
          log(`fn createAppointment: after 'checkIfPersonWithDayAndTimeIsUnique: `)
       
            let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
            dispatch(addDayTimeClient(clientDayTimes));
  
            let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
            dispatch(addDayTimeDentist(dentistDayTimes));
  
            let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
            dispatch(addDayTimeAssistant(assistantDayTimes));
  
            let getClient = client => client.clientId === clientId
            let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
            
            // variable client inside obj appointment is derived data from  the object client.                       
            let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
  
            let getDentist = dentist => dentist.dentistId === dentistId
            let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
            
            // variable dentist inside obj appointment is derived data from  the object dentist.
            let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
  
            let getAssistant = assistant => assistant.assistantId === assistantId
            let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit.assistants, getAssistant)
            
            // variable assistant inside obj appointment is derived data from  the object assistant.
            let assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
  
            let appointmentId = generateRandomAppointmentId();
            let newAppointmentObject = {appointmentId, clientId, client, day, time, dentistId, treatmentType, dentist, assistantId, assistant, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
            dispatch(addAppointment(newAppointmentObject));
        } 
        else {            
            alert('please check if client, dentist and/or assistant have an appointment on this day and time');
            return;
        }
    } else {
        log('the else way')
        log(clientId, dentistId, assistantId, day, time, clientDayTimesFromReduxToolkit, dentistDayTimesFromReduxToolkit, assistantDayTimesFromReduxToolkit )
        if (checkIfPersonWithDayAndTimeIsUnique(
          clientId, 
          day, 
          time, 
          personType = "client",  
          clientDayTimesFromReduxToolkit, 
          dentistDayTimesFromReduxToolkit, 
          assistantDayTimesFromReduxToolkit) &&
            checkIfPersonWithDayAndTimeIsUnique(
              dentistId, 
              day, 
              time, 
              personType = "dentist",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit))
        {
  
          let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
          dispatch(addDayTimeClient(clientDayTimes));

          let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
          dispatch(addDayTimeDentist(dentistDayTimes));
  

          let getClient = client => client.clientId === clientId
          let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
          
          // variable client inside obj appointment is derived data from  the object client.
          let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

          let getDentist = dentist => dentist.dentistId === dentistId
          let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
          
          // variable dentist inside obj appointment is derived data from  the object dentist.
          let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
         
          let appointmentId = generateRandomAppointmentId();
          let newAppointmentObject = {appointmentId, clientId, client, day, time, dentistId, dentist, assistantId:null, assistant:null, isSick:false, isNowUpdatingAppointment:false } // bonus: 1 treatmentType
          dispatch(addAppointment(newAppointmentObject));   
        }
        else {            
            alert('please check if client and/or dentist have an appointment on this day and time');
            return;
        }
    } 
  } 


  export function deleteDentalAppointment (appointmentsfromReduxToolkit, appointmentId, appointmentIndexInAppointmentsArray, deleteDayTimeClient, deleteDayTimeDentist, deleteDayTimeAssistant, dispatch) {
    log('fn deleteAppointment start: ')
    console.log(appointmentId)
  
    let getAppointment = appointment => appointment.appointmentId === appointmentId
    let appointmentThatIsAboutToBeDeleted = selectObjectsByArrayObjectKey(appointmentsfromReduxToolkit.appointments, getAppointment)
    
    console.log('appointmentThatWillBeDeleted:')
    console.log(appointmentThatIsAboutToBeDeleted[0])
  
    let {clientId, day, time, dentistId, assistantId} = appointmentThatIsAboutToBeDeleted[0];
  
    let clientDayTimes  = createCombiOfPersonAndDayAndTime(clientId, day, time)
    dispatch(deleteDayTimeClient(clientDayTimes));
    
    let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
    dispatch(deleteDayTimeDentist(dentistDayTimes));
  

    if (assistantId !== null) {
        let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
        dispatch(deleteDayTimeAssistant(assistantDayTimes));
    }
  
    dispatch(deleteAppointment(appointmentIndexInAppointmentsArray))
    log('fn deleteAppointment end: ')
  }