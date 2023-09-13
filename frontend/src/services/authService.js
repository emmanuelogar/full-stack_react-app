import fetchWrapper from '../interceptors/fetchWrapper';

export const authUser = async (login) => {

   try {
     // Send login credentials to backend using fetch
     const response = await fetchWrapper('/auth', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(login),
     });

     return response;
  
   } catch (error) {
     console.error('Authentication error:', error);
     return error;
   }
};

export const fetchVerifyToken = async() => {
   try {
     const response = await fetch('http://localhost:3333/auth/verify-token', {
       headers: {
         'authorization': sessionStorage.getItem('authToken'),
       },
       //body: JSON.stringify(login),
     });
     //console.log(response);
     return response;

   } catch (error) {
     console.error('Error checking Token:', error);
     return error;
   }
};

export const fetchRefreshToken = async() => {
   try {
     const response = await fetch('http://localhost:3333/auth/refresh-token', {
       body: JSON.stringify(sessionStorage.getItem('refreshToken')),
     });
     return response;

   } catch (error) {
     console.error('Error checking Refresh Token:', error);
     return error;
   }
};

// eslint-disable-next-line no-undef
/*module.exports = {
   authUser,
   fetchVerifyToken,
   fetchRefreshToken,
};*/
