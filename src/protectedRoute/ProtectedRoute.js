import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../contextAPI/auth";

const ProtectedRoute = ({children}) => {

  const {token, user} = useAuth();

  if(!token || !user?._id) return <Navigate to="/login" replace/>;

  return children;

}

export default ProtectedRoute