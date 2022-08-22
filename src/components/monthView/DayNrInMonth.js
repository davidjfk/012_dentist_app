import React from "react";

const log = console.log;


export const DayNrInMonth = ({dayNrInMonth}) => {
  // log(`DayNrInMonth: `)
  // log(dayNrInMonth)

  return(
  <div>
      <span className="dayAsNumber">Day: {dayNrInMonth }  </span>    
  </div>
  );
};



