import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextAPI/auth';

const PublicRoute = ({children}) => {
    const {token, user} = useAuth();

    if(token && user?._id) return <Navigate to="/home" replace/>;

    return children
}

export default PublicRoute