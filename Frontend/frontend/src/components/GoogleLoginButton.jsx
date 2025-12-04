import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // 👈 import navigate hook

export default function GoogleLoginButton() {
  const navigate = useNavigate(); // 👈 initialize navigate

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch('https://refurbished-4.onrender.com/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ Include credentials (needed for cookies/tokens)
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      

      if (!res.ok) {
        throw new Error('Failed to log in with Google');
      }

      const userData = await res.json();
      console.log("✅ Google user logged in:", userData);

      toast.success("Logged in successfully with Google!"); // ✅ show toast
      navigate('/'); // ✅ redirect to homepage
    } catch (error) {
      console.error("❌ Google login error:", error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.error('❌ Google Login Failed');
          toast.error("Google login failed");
        }}
        size="large"
        shape="pill"
        width="100%"
      />
    </div>
  );
}
