import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaoGiaRequestCustomer from '../quan-components/BaoGiaRequestCustomer';
import LoginForm from '../Login-components/LoginForm';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/NotFoundPage');
    }
  }, [token, navigate]);
  return token ? <BaoGiaRequestCustomer /> : <LoginForm />;
}
