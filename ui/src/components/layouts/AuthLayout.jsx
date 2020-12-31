import styled from 'styled-components';
import backdrop from '../../backdrop.svg';

const AuthWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
`

const Background = styled.div`
  grid-column: span 5 / span 5;
  background: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AuthFormWrapper = styled.div`
  grid-column: span 7 / span 7;
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AuthLayout = ({ children }) => {
  return (
    <AuthWrapper>
      <Background>
        <img style={{ width: '20rem' }} src={backdrop} alt="backdrop" />
      </Background>
      <AuthFormWrapper>
        {children}
      </AuthFormWrapper>
    </AuthWrapper>
  )
}
