import styled from 'styled-components'

export const StyledInputfield = styled.input`
  font-size: ${({ theme}) => theme.fontSize.default };
  padding-left: 1rem;
  color:  ${({ theme}) => theme.colors.fontColor01 };
  ::placeholder {
    color:  ${({ theme}) => theme.colors.fontColor01 };
  }
  &:hover {
    background-color: ${({ theme}) => theme.colors.onHoverBackground02 };
  }
`