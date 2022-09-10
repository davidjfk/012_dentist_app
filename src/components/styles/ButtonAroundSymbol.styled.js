import styled from 'styled-components'

export const StyledButtonAroundSymbol = styled.button`
  pointer-events ${({ theme}) => theme.pointerEvents}; 
  background-color: ${({ theme}) => theme.colors.background03}; 
  border-radius: 50px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  color: #A6B8B9;
  cursor: pointer;
  font-family: ${({ theme}) => theme.font };
  font-size: ${({ theme}) => theme.fontSize.default };
  font-weight: 550;
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  padding-right: 1.2rem;
  
  &:hover {
    opacity: 0.9;
    transform: scale(0.97);
    background-color: #778899;
  }

  @media (max-width: 700px) {
    font-size: ${({ theme}) => theme.fontSize.medium };
  }
`



