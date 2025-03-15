import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header & Footer/Header';
import HomePage from './Khang-component/HomePage';
import Appointment from './Khang-component/Appointment';
import Footer from './Header & Footer/Footer';
import Login from './Auth/login';
import Register from './Auth/register';
import Payment from './Auth/Payment';
import Profile from './Khang-component/Profile';
import CancelPayment from './Khang-component/CancelURL';
import Message from './Khang-component/Message';
import Facial from './Khang-component/Facial';
import Bodytreatment from './Khang-component/Bodytreatment';
import Aromatherapy from './Khang-component/aromatherapy';
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
         <Route path="/payment" element={<Payment/>}/>
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/cancelpayment" element={<CancelPayment/>}/>
         <Route path="/massage" element={<Message/>}/>
         <Route path="/facial" element={<Facial/>}/>
         <Route path="/body-treatment" element={<Bodytreatment/>}/>
         <Route path="/aromatherapy" element={<Aromatherapy/>}/>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;