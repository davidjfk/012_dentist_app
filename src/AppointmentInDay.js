import React from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

export default ({ time, day, client, dentist, assistant }) => (
  <li className="appointment">
    <div className="time">{format_time(time)}</div>
    <div className="dayAsNumber">Day number: {day}</div>
    <div className="client">Client: {client}</div>
    <div className="dentist">Tandarts: {dentist}</div>
    <div className="assistant">Assistent: {assistant}</div>
  </li>
);
