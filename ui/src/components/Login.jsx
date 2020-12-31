import React, { useState, useContext, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import { AuthContext } from '../hooks/authContext';
import {withAuthLayout} from '../hoc';
import styled, { keyframes } from 'styled-components';

const Login = () => {
  const {user, setUser} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await fetch(
      'http://localhost:4000/login',
      {
        method: 'POST',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    ).then((res) => res.json())

    if (result.accesstoken) {
      setUser({accesstoken: result.accesstoken});
      navigate('/');
    } else {
      console.log(result.error);
    }
  };

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleChange = e => {
    if (e.currentTarget.name === 'email') {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <p style={{ fontSize: '1.5rem'}}>Login</p>
      <InputWrapper>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="email"
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={handleChange}
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
        />
      </InputWrapper>
      <p style={{ margin: '1rem 0'}}>Don't have an account <Link to='/register'><span style={{ color: '#3b82f6'}}>register</span></Link></p>
      <Button type="submit">Login</Button>
    </FormWrapper>
  );
};

const wawes = keyframes`
  from {
    -webkit-transform: rotate(0);
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

const FormWrapper = styled.form`
  background-color: #dbeafe;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 600px;
  padding: 1.5rem;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  &:before, &:after {
    content: '';
    z-index: 10;
    position: absolute;
    width: 500px;
    height: 500px;
    border-top-left-radius: 40%;
    border-top-right-radius: 45%;
    border-bottom-left-radius: 35%;
    border-bottom-right-radius: 40%;
  }

  &:before {
    left: 40%;
    bottom: -70%;
    background-color: rgba(69, 105, 144, 0.15);
    -webkit-animation: ${wawes} 6s infinite linear;
    -moz-animation: ${wawes} 6s infinite linear;
    animation: ${wawes} 6s infinite linear;
  }

  &:after {
    left: 35%;
    bottom: -75%;
    background-color: rgba(2, 128, 144, 0.2);
    -webkit-animation: ${wawes} 7s infinite;
    -moz-animation: ${wawes} 7s infinite;
    animation: ${wawes} 7s infinite;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;

  input {
    z-index: 20;
    width: 100%;
    padding: 10px 20px;
    border-radius: 3px;
    outline: none;
    border: 1px solid #f9fafb;
    margin-top: 0.5rem;
  }
`

const Button = styled.button`
  border-radius: 3px;
  padding: 7px 20px;
  background: #3b82f6;
  color: #fff;
  border: none;
  width: 6rem;
  cursor: pointer;

  &:focuse {
    outline: none;
  }
`

export default withAuthLayout(Login);
