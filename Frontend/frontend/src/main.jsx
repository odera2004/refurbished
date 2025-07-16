import React from 'react'; // ✅ REQUIRED for JSX like <React.StrictMode>
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // ✅
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from '@react-oauth/google';


const clientId = 'YOUR_GOOGLE_CLIENT_ID';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="657664230113-v0ngcasp9gg858ehd1b4t3smio9me38l.apps.googleusercontent.com">
    <BrowserRouter>
    <UserProvider> {/* ✅ Wrap App */}
        <App />
      </UserProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
