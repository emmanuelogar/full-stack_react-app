import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import {authUser} from '../../services/authService';
import userService from '../../services/userService';
import Loading from '../../components/Loading/Loading';
import LoginModal from '../../components/LoginModal/LoginModal';
import AppContext from '../../context/AppContext';

import './Login.css';

function Login() {

   const { authToken, setAuthToken, refreshToken, setRefreshToken, setCurrentUser } = useContext(AppContext);

   // eslint-disable-next-line no-unused-vars
   //const [token, setToken] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const [email, setEmail] = useState('super@gmail.com');

   const [loginModalOpen, setLoginModalOpen] = useState(false);

   // Function to handle login form submission
   const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true);

     try {
       // Send login credentials to backend using fetch
       const response = await authUser({
         username,
         password,
       });
      
       // Checks whether the response was successful before processing the body
       if (response.ok) {
         const data = await response.json();
         //console.log(acessToken, refreshToken);
         if (data.status === 'error') {
           setError(data.message);
         } else {
           // Stores the JWT token returned by the backend
           //const {accessToken, refreshToken} = data;
           //setToken(accessToken);
           setAuthToken(data.accessToken);
           setRefreshToken(data.refreshToken);

           // Store the token in sessionStorage
           sessionStorage.setItem('authToken', authToken);
           sessionStorage.setItem('refreshToken', refreshToken);

           setIsAuthenticated(true);
           setCurrentUser(username);
           sessionStorage.setItem('currentUser', username);
           console.log('Logged User');
          
           // eslint-disable-next-line no-unused-vars
           /*const interval = setInterval(() => {
             console.log('called');
             setLoginModalOpen(true);
           }, 5000);*/
           setError(null);
         }
         setLoading(false);
       } else {
         console.error('Authentication error:', response.status);
       }
     } catch (error) {
       console.error('Authentication error:', error);
     }
   };

   // eslint-disable-next-line no-unused-vars
   const handleInsertUser = () => {

     setUsername('super');
     setPassword('super');
     setEmail('super@gmail.com');

     userService.insertUser({
       username,
       password,
       email,
     }).then((response)=>{
       response.status === 201 ? alert('User inserted successfully!') : alert('Error inserting User.');
     });
   };

   if (isAuthenticated) {
     return <Navigate to="/home" />;
   }

   return (
     <>
       <LoginModal
         isOpen={loginModalOpen}
         setIsOpen={setLoginModalOpen}
       />
       <div className="login-container">
         <div className="login-box">
           <h2>LOGIN</h2>
           <form onSubmit={handleSubmit}>
          
             <div className="user-box">
               <input
                 type="text"
                 name=""
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 required
               />
               <label>User</label>
             </div>
             <div className="user-box">
               <input
                 type="password"
                 name="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
               <label>Password</label>
             </div>
             {error && <span className="login-error">{error}</span>}
             {
               (loading && <button>Entering <Loading /></button>) ||
             <button type="submit">Sign in</button>
             }
          
           </form>
         </div>
       </div>
     </>
   );
}

export default Login;
