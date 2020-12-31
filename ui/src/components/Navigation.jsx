import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { Container } from './shared';
import { navigate } from '@reach/router';
import { AuthContext } from '../hooks/authContext';

const Nav = styled.nav`
  display: flex;
  padding: 0.5rem 1rem;
  margin: 0 auto;
  width: 100%;
`

const Navigation = () => {
  const {user, setUser} = React.useContext(AuthContext);

  const logOutCallback = async () => {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
    });
    // Clear user from context
    setUser({accesstoken: ''});
    // Navigate back to startpage
    navigate('/');
  }

  return (
    <Container>
      <Nav>
        <Link to='/'>Home</Link>
        <Link to='/protected'>Protected</Link>
        <Link to='/register'>Register</Link>
        <button onClick={logOutCallback}>Log Out</button>
      </Nav>
    </Container>
  )
}

export default Navigation;