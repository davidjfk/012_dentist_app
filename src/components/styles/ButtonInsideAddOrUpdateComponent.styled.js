import styled from 'styled-components'

export const StyledButtonInsideAddOrUpdateComponent = styled.button`
  background-color: white;  
  border-radius: 50px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  color: ${({ theme}) => theme.colors.fontColor01};
  cursor: pointer;
  font-size: ${({ theme}) => theme.fontSize.default };
  background: ${({ theme}) => theme.colors.button01};
  font-weight: 550;
  padding: 0.1rem 1.2rem;
  white-space: nowrap;
  
  &:hover {
    opacity: 0.9;
    transform: scale(0.97);
    background: ${({ theme}) => theme.colors.onHoverBackground01};
    font-weight: 700;
    border-style: dotted;
  }

  @media (max-width: 700px) {
    font-size: ${({ theme}) => theme.fontSize.medium };
  }
`



