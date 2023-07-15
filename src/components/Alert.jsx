import React, { useEffect } from 'react'

const Alert = ({ showAlert, setShowAlert, alertText }) => {

   useEffect(() => {
      const timer = setTimeout(() => {
         setShowAlert(false)
      }, 1000);
      return () => clearTimeout(timer);
   }, [showAlert]);

   return (
      <div 
         className='alert'
         style={{ bottom: showAlert ? '35px' : '-20%' }}
      >
         {alertText}
      </div>
   )
}

export default Alert