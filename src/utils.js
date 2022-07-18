

// remove imports after use case 1 has been completed. See fn generateRandomAppointment below.
import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"


export const generateRandomAppointmentId = () => Math.floor(10000000 + Math.random() * 9000000); // 7 digits
export const generateRandomPersonId = () => Math.floor(1000000 + Math.random() * 900000); // 6 digits


export const getRandomPersonId = (personCategoryInCompanyBVT) => {
  /*
    personCategory is an array with either only randomly generated clients, dentists, or assistants.
    I have created the person categories in Mockaroo, as well as random person ids.
    As an alternative (yagni?...) I have created this fn to create a random person ids.
  */
  const person = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
  return `${person["lastName"]}-${generateRandomPersonId()}`; 
};



const getRandomName = (personCategoryInCompanyBVT) => {
  const person = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
  return `${person["firstName"]} ${person["lastName"]}`;
};



export const getRandomPersons = (personCategoryInCompanyBVT, nrOfPersons) => {
  let randomPersons = [];
  for (let i = 0; i < nrOfPersons; i++) {
    let randomPerson = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
    randomPersons.push(randomPerson)
  };
  return randomPersons;
};

const getRandomTime = () => {
  let hour;
  while (true) {
    hour = Math.floor(Math.random() * 24);
    if (hour > 7 && hour < 19) {
      return hour;
    }
  }
}; 

const getRandomDay = () => {
  let randomDay = 6;
  while ([6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
    randomDay = Math.floor(Math.random() * 28) + 1;
    if (![6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
      return randomDay
    } 
  }
  return randomDay
}


export const isValidWorkingDay = (dayNumber) => (![6, 7, 13, 14, 20, 21, 27, 28].includes(dayNumber) ? true : false)
export const isValidWorkingTime = (hourNumber) => (hourNumber > 7 && hourNumber < 19 ? true : false)


//2do: update this fn as part of use case 1. 
const generateRandomAppointment = () => ({
  appointmentId: generateRandomAppointmentId(), // appointmentId not part of the kick-start code. 
  day: getRandomDay(),
  time: getRandomTime(),
  client: getRandomName(clientsDentistCompanyBVT),
  dentist: getRandomName(dentistsDentistCompanyBVT),
  assistant: getRandomName(assistantsDentistCompanyBVT),
});


export const generateRandomAppointments = num =>
  Array(num)
    .fill(0) // why fill with 0 before mapping? The undefineds are replaced by zeros, but why?
    /* see MDN ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array ): A JavaScript array is 
      initialized with the given elements, except in the case where a single argument is passed to the Array constructor and that 
      argument is a number (see the arrayLength parameter below). 
      imho: skip fill(0)
    */
    .map(_ => generateRandomAppointment());

