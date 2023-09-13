/* File to intercept requests, place a header with the accessToken and check if it is necessary to make a refreshToken */

const baseUrl = 'http://localhost:3333';

const fetchWrapper = async (url, options) => {
   // Checks for a token and adds an authorization header
   const token = sessionStorage.getItem('authToken');
   if (token) {
     options.headers = {
       ...options.headers,
       'authorization': `Bearer ${token}`,
     };
   }

   const response = await fetch(`${baseUrl}${url}`, options);

   // Check the response and update the token if necessary
   if (response.status === 401) {
     const newToken = await refreshToken();
     if (newToken) {
       options.headers.authorization = `Bearer ${newToken}`;
       return fetchWrapper(url, options);
     }
   }

   return response;
};

const refreshToken = async() => {
   try {
     const response = await fetch(`${baseUrl}/auth/refresh-token`, {
       method: 'POST',
       headers: {
         'authorization': sessionStorage.getItem('refreshToken'),
       },
       //body: JSON.stringify(sessionStorage.getItem('refreshToken')),
     });
        
     const data = await response.json();
     const newToken = data.authToken;

     // Update the token in storage
     sessionStorage.setItem('authToken', newToken);

     return newToken;
    
   } catch (error) {
     console.error('Error checking Refresh Token:', error);
     return error;
   }
};

export default fetchWrapper;
