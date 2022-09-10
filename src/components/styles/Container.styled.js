import styled from 'styled-components'

export const Container = styled.div`
  width: 2000px;
  max-width: 93vw;
  padding: 0.4rem;
  margin: 2rem auto;
  background: ${({ theme}) => theme.colors.background02 };
  font-size: ${({ theme}) => theme.fontSize.default }
`
