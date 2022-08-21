import styled from 'styled-components'

export const StyledSelectbox = styled.select`
font-size: ${({ theme}) => theme.fontSize.default };
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  &:hover {
    background-color: ${({ theme}) => theme.colors.onHoverBackground };
  }
 
  @media (max-width: 700px) {
    font-size: ${({ theme}) => theme.fontSize.medium };
    width: 20rem;
  }
`