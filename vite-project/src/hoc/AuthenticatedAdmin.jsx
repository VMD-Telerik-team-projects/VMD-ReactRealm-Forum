import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import PropTypes from 'prop-types';

/**
 * 
 * @param {{children: React.ReactNode }} props 
 * @returns 
 */
export default function AuthenticatedAdmin({ children }) {
  const { user, userData } = useContext(AppContext);
  const location = useLocation();

  console.log(userData);

  if(!user) {
    return <Navigate replace to="/signin" state={{ from: location }}/>
  }

  if(userData.priviliges !== 0) {
      return <h1>You don&apos;t have the required priviliges to access this page!</h1>
  }

  return (
      <>
          {children}
      </>
  )
}

AuthenticatedAdmin.propTypes = {
  children: PropTypes.node.isRequired,
}