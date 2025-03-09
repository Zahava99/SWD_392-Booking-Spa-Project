// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import Header from './Header & Footer/Header';
// import Footer from './Header & Footer/Footer';
// import AppointmentForm from './Khang-component/AppointmentForm';
// import './App.css'

// function App() {
//   return (
//     <div>
//       <Header />
//       <AppointmentForm />
//       <Footer />
//     </div>
//   );
// }

// export default App
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header & Footer/Header';
import HomePage from './Khang-component/HomePage';
import Appointment from './Khang-component/Appointment';
import Footer from './Header & Footer/Footer';
import Login from './Auth/login';
import Register from './Auth/register';
// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes as needed */}
          <Route path="/appointment" element={<Appointment />} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;