import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const LogoutPage = () => {
  const navigate = useNavigate();
 const token = localStorage.getItem('token')
  useEffect(() => {
    const logout = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        await axios.get('http://localhost:3000/users/logout',
          {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
          }
        );

        localStorage.removeItem('user_id');
        localStorage.removeItem('token');

        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/login');
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-xl">Logging you out...</h1>
    </div>
  );
};

export default LogoutPage;
