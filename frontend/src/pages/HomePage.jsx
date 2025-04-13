import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import image from '../assets/images/crp-upskill.png';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id =localStorage.getItem('user_id')
  
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:3000/courses')
      .then(response => {
        const coursesData = response.data.courses || [];
        setCourses(coursesData);
      })
      .catch(error => {
        console.error('Error fetching courses', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getRandomGradient = (id) => {
    const gradients = [
      'from-blue-600 to-blue-800',
      'from-purple-600 to-purple-800',
      'from-green-600 to-green-800',
      'from-indigo-600 to-indigo-800',
      'from-pink-600 to-pink-800',
      'from-teal-600 to-teal-800'
    ];
    return gradients[id % gradients.length];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-white mb-12">Discover Available Courses</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse border border-gray-700">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </div>
                  <div className="mt-6 h-10 bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            Expand Your Knowledge
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse our collection of professional courses designed to boost your skills and career
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-white">No courses available</h3>
            <p className="mt-1 text-gray-400">We couldn't find any courses at the moment.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6">Featured Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map(course => (
                <div key={course.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl border border-gray-700">
                  <div className={`h-48 bg-gradient-to-r ${getRandomGradient(course.id)} flex items-center justify-center`}>
                    <img 
                      src={course.image || image}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/50 text-blue-300">
                        {course.category || 'General'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-400 line-clamp-3 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration || '8 hours'}
                      </div>
                        {id ?
                      <Link
                        to={`/courses/${course.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        View Course²
                      </Link>
                    : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
window.location.reload;

export default HomePage;