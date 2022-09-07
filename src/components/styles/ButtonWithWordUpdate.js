import styled from 'styled-components'

export const StyledButtonWithWordUpdate____redundant_2do_throw_away = styled.button`
  pointer-events ${({ theme}) => theme.pointerEvents};   
  float: right;
  background-color:  ${({ theme}) => theme.colors.button01};
  margin-right: 20px; 
  margin-top: 20px; 
  padding: 6px;

  cursor: pointer;
  border-radius: 50px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  color: #333;
  
  font-family: ${({ theme}) => theme.font };
  font-size: ${({ theme}) => theme.fontSize.medium };
  font-weight: 550;

  &:hover {
    opacity: 0.9;
    transform: scale(0.97);
    background: ${({ theme}) => theme.colors.onHoverBackground01 };
    color: white;
    font-weight: 700;
    border-style: dotted;
  }

  @media (max-width: 700px) {
    font-size: ${({ theme}) => theme.fontSize.medium };
  }
`



