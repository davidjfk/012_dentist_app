import React from "react";

import {DayNrInMonthStyled} from './DayNrInMonth.styled';

export const DayNrInMonth = ({dayNrInMonth}) => {
  return(
  <DayNrInMonthStyled>
      Day: {dayNrInMonth }     
  </DayNrInMonthStyled>
  );
};



