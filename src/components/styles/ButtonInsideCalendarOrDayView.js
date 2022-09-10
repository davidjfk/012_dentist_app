import styled from 'styled-components'

export const StyledButtonInsideCalendarOrDayView = styled.button`
  pointer-events ${({ theme}) => theme.pointerEvents};   
  float: right;
  background: ${({ theme}) => theme.colors.button01};
  margin-right: 20px; 
  margin-top: 20px; 
  padding: 6px;

  cursor: pointer;
  border-radius: 50px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  
  font-size: ${({ theme}) => theme.fontSize.medium };
  font-weight: 550;

  &:hover {
    opacity: 0.9;
    transform: scale(0.97);
    background-color: ${({ theme}) => theme.colors.onHoverBackground01 };
    font-weight: 700;
    border-style: dotted;
  }

  @media (max-width: 700px) {
    font-size: ${({ theme}) => theme.fontSize.medium };
  }
`



