import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../customHooks/UserContext';

const PrivateRoute = ({ element, isadmin }) => {
  const user = useUserContext();

  if (user.name === '' || (isadmin && isadmin !== 'true')) {
    return <Navigate to="/error" />;
  }

  return element;
};

export default PrivateRoute;
