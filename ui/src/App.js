import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import Global from './styles/global';

import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import Content from './components/Content';
import { AuthContext } from './hooks/authContext';


function App() {
  const { user, setUser } = React.useContext(AuthContext)
  const [loading, setLoading] = useState(true);

  // First thing, check if a refreshtoken exist
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (await fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        }
      })).json();
        setUser({accesstoke: result.accesstoken});
        setLoading(false);
    }
    checkRefreshToken();
  }, []);

  if (loading) return <div>Loading ...</div>

  return (
    <>
      <Global />
      <div className="app">
        <Router id="router">
          <Login path="login" />
          <Register path="register" />
          <Protected path="protected" />
          <Content path="/" />
        </Router>
      </div>
    </>
  );
}

export default App;
