import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await fetch('https://refurbished-1.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.access_token);
        return true;
      } else {
        alert(data.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login Error:', error);
      return false;
    }
  };
  

  const register = async (full_name, email, phone_number, password, role, campus) => {
    try {
      const response = await fetch('https://refurbished-1.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name,
          email,
          phone_number,
          password,
          role,
          campus,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // ✅ Automatically create VendorProfile if role is vendor
        // if (role === 'vendor') {
        //   await fetch('https://refurbished-1.onrender.com/vendor-profiles', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //       user_id: data.user_id, // You must return `user_id` from /register
        //       store_name: full_name + "'s Shop", // default store name
        //       bio: '',
        //       subscription_status: 'free'
        //     }),
        //   });
        // }
  
        return true;
      } else {
        toast.error(data.error || 'Registration failed');
        return false;
      }
    } catch (error) {
      toast.error('Network error or server is down');
      console.error('Registration Error:', error);
      return false;
    }
  };
  

  const logout = async () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        await fetch('https://refurbished-1.onrender.com/logout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout Error:', error);
      }
    }
  
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  
    toast.error('Logged out successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };
  
  
  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}
