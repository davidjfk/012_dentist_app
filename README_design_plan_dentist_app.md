# Design and plan to implement dentist app:

# June 25th

Time to make design below: 2.5 hours 
Time left to implement: 13.5 hours (challenge: trying to complete assignment in 16 hours)
After pushing this design and plan to github repo on the main branch, I will work on feature branche(s).

* Requirements intake:
Assumptions about the requirements:
1. Each dental treatment requires the presence of 1 dentist.
2. dentist decides if (s)he needs an assistant. 
3. Each type of dental treatment can be with or without an assistant. 
4. the nr of dental treatment rooms is infinite. 
5. an assistent assists a dentist, but does not perform dental treatments on its own (in real life assistent would do e.g. oral hygiene treatment, remove tartar etc.  )
6. there are no checks if workload is spread evenly among dentists and assistants...welcome to the dental treatment sweatshop. 


* Component structure: 6 components (or 7): 
1) DentalPractice.js (parent component with app state, unless I use Redux-toolkit...and I will)
2) Patient.js (child component)
3) Treatment.js (child component) --> not a requirement, so probably quicker to load this data as an object into global state in a componentDidMount scenario, or to just hard-code the treatment options into a selectbox:
    - bridge.js 
    - crown 
    - filling
    - root_canal_treatment
    - scale and polish
    - brace
    - wisdom tooth removal
    - dental implant
    - denture_false_teeth
    - broken or knocked out tooth
    - teeth whitening
    - dental veneer

   
4) Dentist.js (child component)
5) Assistant.js (child component) --> not a requirement to CRUD an assistent.
6) Calendar.js (child component)
7) Appointment.js (child component)

* Routing: the following components get their own routing:
1. Appointment.js --> this is  the most important page that will be used most often, so its NavLink will be to the left of the screen.
2. Calendar view.js --> this is also important page.
3. Day view.js --> also important page 
4. Patient.js --> more patients get added than dentists or assistants,  so I add Patient.js first
5. Dentist.js 
6. Assistant.js --> skip, not a requirement (unless  I have time left)


* State management: 
Each child component creates its own state and saves it to Redux-toolkit-slice: 
1. patients are added in component Patient.js in child component AddPatient.js  
    a) result: patient is shown in component DisplayPatient (2do: create this  component). component DisplayPatient is child component of component Patient.js. 
    b) patient_id (e.g. Darwish_953462) is added to Appointment.js in the selectbox to select a patient. --> see https://www.javascripttutorial.net/javascript-dom/javascript-add-remove-options/ . 
2. dentists are added in component Dentist.js in child component AddDentist.js
    a) result: dentist is shown in component DisplayDentist (2do: create this  component). component DisplayDentist is child component of component Dentist.js. 
    b) Dentist_id (e.g. Darwish_953462) is added to Appointment.js in selectbox to select patient.

3. component Appointment creates appointment(s) in child component AddAppointment.js. --> so while creating an appointment you cannot create e.g. a patient, nor assistant, nor dentist. You must do that before in their own component. 
    a) result: appointment is shown in component DisplayAppointment (2do: create this  component). component DisplayAppointment is child component of component Appointment.js. 
    b) Appointment (identified by appointment_id, e.g. Appointment_056946, is added to Calender (month) view and Day view.


* naming conventions:
Each patient, dentist, assistent and appointment (as data state that are created in the just mentioned components with the same name) will have their own id consisting of 3 parts: surname + undercore + unique nr of 6 digits (randomn or ascending nr from a closure) e.g. Darwish_953462.  I need this format to be sure that I select e.g. the correct patient  to make an appointment (e.g. 2 patients can have the name Bakir). First the name and then the unique nr makes it possible to sort the select-box-options before I insert the options into the selectbox. 

Component calendar must handle 28 days of a next month: 20 working days and 8 weekend days. On working days dentists and/or assistants work from 09.00-17.00  (no lunch break, sorry :) ). Use form validation to check that correct day and time are selected to make an appointment. 
Each appointment lasts an hour.
A day-time has the following format: "2010" === day 20 with appointment starting at 10 o'clock (until 11) //   "0816" === day 8 with appointment starting at 16.00 o'clock (until 17).

The "2010" or "0816" will be a an object reference as part of the big state object (be it in Redux-toolkit, useContext or global state in the app. I choose Redux-toolkit).
e.g. "2010 = {id: Dentist083596_Ayad, id: Assistant03949463_Bakir, etc.}



* Use cases:
The proof of the pudding will be "to eat" component 'appointment', because here the other components (and their state) meet and greet:

use case 1of3: a an assistant I enter a dental appointment for a patient into the dentist-app: 
1. choose patient (from selectbox)
2. select 1 treatment (from selectbox) --> must be step 2, otherwise I cannot check if dentist has the skill to perform this treatment (is bonus requirement)
3. choose day-time (e.g. "2010") from select box. --> must be step 3, otherwise I cannot check availability of dentist nor assistant in the next steps
4. choose dentists (from selectbox)  --> business logic: in the controlled component do an immediate check if timeslot is available.  Alternative: check availability when clicking the 'add appointment' button in a step below (which would be less user friendly).
5. choose assistant (from selectbox) --> idem
6. if everyting peachy, then click button 'add appointment':
    1) add appointment-object to global state:
    Appointment_056946 = {
        patientId: Darwish_953462,
        treatmentName: "parodontology",
        dayTime: "2010",
        dentist: Ayad_083596,
        Assistant: Bakir_03949463,
        isUpdateAppointment: false, --> while appointment is updated (see use case 'update an appointment' below), the boolean is set to true. 
    }
    1) appointment is added to the list with appointments in component 'Appointments'. For this purpose a component DisplayAppointments must be created that is a child component of Appointments.js
    2) appointment becomes automatically visible in the Calender (month) view and the day view.


use case 2of3: a an assistant I delete a dental appointment for a patient in the dentist-app (e.g. the patient is ill, so cannot come): 
1. in component DisplayAppointments (is child of component Appointments) click delete-button on the row that contains the appointment-to-delete. --> Each appointment will have their own button 'delete'.
2. result: via inverse data flow (via redux-toolkit) appointment is removed from state. Automatic re-render will make then apppointment disappear in component DisplayAppointments.
3. result: appointment will disappear from calender (month) view and day view, due to automatic re-render.


use case 3of3: a an assistant I update a dental appointment for a patient in the dentist-app: (e.g. bonus requirement: move appointment to other day-time: e.g. "2010" becomes "0211"):
1. make immutable copy of appointment-to-update.
2. delete the appointment-to-update from state. 
3. in component DisplayAppointments (is child of component Appointments) click update-button on the row that contains the appointment-to-update. --> Each appointment will have its own button 'update'.
4. To start the update of appointment, A click event on button 'update' will set the boolean isUpdateAppointment to true. 
5. if true, use conditional rendering to display the component UpdateAppointmen. --> 2do: create this component inside component DisplayAppointments. ( ps DisplayAppointments itself is a child component of component Appointments, and component Appointments is a child component of DentalPractice.js). 
6.  example: see object with name 'Appointment_056946' (see example code above).
7. "paste" the appointment-data into the update-window.  --> this update-window is a re-use of the component AddAppointment. --> this means that after each update the appointment will have a new appointment_id (e.g. Appointment_056946). This is not an impediment, because there is no connection to e.g. a billing program to make the invoices (in which case the invoice would have to be connected to the updated appointment_id as well). 
8. make the necessary modification(s) (e.g. move the appointment, switch to another dentist, etc.)
9. save the appointment 
10. result: via inverse data flow (via redux-toolkit) appointment is updated in state. Automatic re-render will make then apppointment update in component DisplayAppointments.
11. result: appointment will update in calender (month) view and day view, due to automatic re-render.

















This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
