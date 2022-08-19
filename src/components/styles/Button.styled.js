import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: white;  
  border-radius: 50px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  color: #333;
  cursor: pointer;
  font-family: ${({ theme}) => theme.font };
  font-size: ${({ theme}) => theme.fontSize.default };
  font-weight: 550;
  padding: 0.1rem 1.2rem;
  
  &:hover {
    opacity: 0.9;
    transform: scale(0.97);
    background-color: ${({ theme}) => theme.colors.onHoverBackground };
  }

  @media (max-width: 700px) {
    font-size: ${({ theme}) => theme.fontSize.medium };
  }
`



