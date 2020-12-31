import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../hooks/authContext';

const Protected = () => {
  // Could have something here to check for the time when the accesstoken expires
  // and then call the refresh_token endpoint to get a new accesstoken automatically
  const {user} = useContext(AuthContext);
  const [content, setContent] = useState('You need to login');

  useEffect(() => {
    async function fetchProtected() {
      const result = await fetch(
        'http://localhost:4000/protected',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accesstoken}`,
          },
        }
      ).then(res => res.json());

      if (result.data) setContent(result.data)
    }
    fetchProtected();
  }, [user])

  return <div>{content}</div>;
}

export default Protected;