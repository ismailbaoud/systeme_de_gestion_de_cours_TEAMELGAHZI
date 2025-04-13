import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

function Navbar() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem('user_id'));
    };
    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(() => {
      setUserId(localStorage.getItem('user_id'));
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-purple-600">
          <Link to="/">TEAMELGHAZI</Link>
        </div>
        
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
          {userId &&
            <>
              <li><Link to="/Dashboard" className="hover:text-purple-600">Dashboard</Link></li>
              <li><Link to="/courses/create" className="hover:text-purple-600">Create Course</Link></li>
              <li><Link to="/modules/create" className="hover:text-purple-600">Create Module</Link></li>
              <li><Link to="/lessons/create" className="hover:text-purple-600">Create Lesson</Link></li>
            </>
          }
          {!userId && (
            <>
              <li><Link to="/register" className="hover:text-purple-600">Register</Link></li>
              <li><Link to="/login" className="hover:text-purple-600">Login</Link></li>
            </>
          )}
          {userId && <li><Link to="/logout" className="hover:text-purple-600">Logout</Link></li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
