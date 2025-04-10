import React, { useState, useEffect } from 'react';
import JobNotification from './Component/JobNotification';
import RoutesConfig from './routes/RoutesConfig'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <RoutesConfig/>
      <ToastContainer />


    </>
  )
}

export default App

