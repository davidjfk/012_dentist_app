import styled from 'styled-components'

export const StyledInputfield = styled.input`
  font-size: ${({ theme}) => theme.fontSize.default };
  padding-left: 1rem;
  color: black;
  ::placeholder {
    color: black;
  }
  &:hover {
    background-color: ${({ theme}) => theme.colors.onHoverBackground };
  }
`