/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import './LoginModal.css';
import { Navigate } from 'react-router-dom';
//import AppContext from "../../context/AppContext";

function Modal({ isOpen, setIsOpen }) {

   const [time, setTime] = useState(10);

   const handleCloseModal = () => {
     setIsOpen(false);
   };

   const handleLogout = () => {
     console.log('LogOut');
     // Remove Token from WhiteList

     setIsOpen(false);

   };

   const handleLogin = () => {
     console.log('LogIn');
     //clearInterval(contTime);
   };

   useEffect(() => {
     const contTime = setInterval(() => {
       if (time > 0) {
         setTime(prevValue => prevValue - 1);
       } else {
         clearInterval(contTime);
       }
     }, 1000);

     return() => {
       clearInterval(contTime); // Clear range when component is unmounted
     };
   }, [time]);

   // Redirect to another route when the counter reaches zero
   /*if (time === 0 || !isOpen) {
     return <Navigate to="/home" />;
   }*/

   return (
     <div>
       {isOpen && (
         <div className="modal">
           <div className="modal-content">
             <div className="modal-title">
               <h3>Login Expiration</h3>
               <span className="close" onClick={handleCloseModal}>
                     &times;
               </span>
             </div>
             <div className="modal-text">
               <p>{`Your Login will expire in ${time} seconds`}</p>
             </div>
             <div className="modal-button-container">
               <button type="button" onClick={handleLogin}>Continue</button>
               <button type="button" onClick={handleLogout}>Exit</button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
}

export default Modal;

Modal.propTypes = {
   data: propTypes.object
}.isRequired;
