// remove imports after use case 1 has been completed. See fn generateRandomAppointment below.
import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"





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
