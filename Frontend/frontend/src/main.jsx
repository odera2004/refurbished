import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Get the Google Client ID from environment variables
// This assumes you are using a build tool like Vite (import.meta.env.VITE_...)
// or Create React App (process.env.REACT_APP_...).
// Based on your previous context, it's likely VITE_GOOGLE_CLIENT_ID if using Vite.
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

// Log it to console during development to verify it's loading correctly
console.log("Using Google Client ID:", GOOGLE_CLIENT_ID);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Use the GOOGLE_CLIENT_ID from environment variables */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
