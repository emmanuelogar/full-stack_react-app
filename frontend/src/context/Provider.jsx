import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({children}) {

   const [entitySelected, setEntitySelected] = useState('cliente');
   const [currentUser, setCurrentUser] = useState(() => {
     return sessionStorage.getItem('currentUser') || '';
   });
   const [authToken, setAuthToken] = useState(
     () => {
       // Get the token stored in sessionStorage, if it exists
       return sessionStorage.getItem('authToken') || null;
     }
   );
   const [refreshToken, setRefreshToken] = useState(
     () => {
       return sessionStorage.getItem('refreshToken') || null;
     }
   );
   const [tokenExpiration, setTokenExpiration] = useState(5000);

   useEffect(() => {
     // Update sessionStorage whenever tokens change
     if (authToken) {
       sessionStorage.setItem('authToken', authToken);
     } else {
       sessionStorage.removeItem('authToken');
     }

     if (refreshToken) {
       sessionStorage.setItem('refreshToken', refreshToken);
     } else {
       sessionStorage.removeItem('refreshToken');
     }
   }, [authToken, refreshToken]);

   const value = {
     entitySelected,
     setEntitySelected,
     currentUser,
     setCurrentUser,
     authToken,
     setAuthToken,
     refreshToken,
     setRefreshToken,
     tokenExpiration,
     setTokenExpiration
   };

   return (
     <AppContext.Provider value={ value }>
       {children}
     </AppContext.Provider>
   );
}

export defaultProvider;

Provider.propTypes = {
   children:propTypes.any,
}.isRequired;
