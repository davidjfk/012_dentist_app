import styled from 'styled-components'

export const Container = styled.div`
  width: 1500px;
  max-width: 90vw;
  padding: 0.4rem;
  margin: 2rem auto;
  background-color: yellow;

  font-family: ${({ theme}) => theme.font }
  font-size: ${({ theme}) => theme.fontSize.default }
`
