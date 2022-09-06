import React from "react";

import {log} from "../../utils";

// import "./Calendar.css";
import {DayNrInMonthStyled} from './DayNrInMonth.styled';

export const DayNrInMonth = ({dayNrInMonth}) => {
  return(
  <DayNrInMonthStyled>
      Day: {dayNrInMonth }     
  </DayNrInMonthStyled>
  );
};



