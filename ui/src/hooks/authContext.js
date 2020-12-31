import React from 'react';

const AuthReducer = (state, action) => {
  const { user } = action;
  switch(action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user
      }
    }
    default: return state;
  }
}

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: {}
  }

  const [state, dispatch] = React.useReducer(AuthReducer, initialState);
  const { user } = state;

  const setUser = user => {
    dispatch({ type: 'SET_USER', user })
  }

  return <AuthContext.Provider value={{ user, setUser }}>
    {children}
  </AuthContext.Provider>
}

