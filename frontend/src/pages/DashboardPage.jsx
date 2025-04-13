import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const DashboardPage = () => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem('user_id');
        const response = await axios.get(`http://localhost:3000/enrollement/user/${userId}`);
        setCourses(response.data || []);
        
        const progressData = {};
        for (let course of response.data) {
          const courseProgress = await getCourseProgress(course.id, userId);
          progressData[course.id] = courseProgress;
        }
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        setError('Failed to load your courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const getCourseProgress = async (courseId, userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/courses/${courseId}/progress/${userId}`);
      return response.data.progressPercentage;
    } catch (error) {
      console.error('Error fetching course progress:', error);
      return 0;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700 max-w-md mx-4">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-white">{error}</h3>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Your Learning Dashboard</h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Track your progress and continue where you left off
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 max-w-2xl mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-white">No courses enrolled</h3>
            <p className="mt-1 text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div 
                key={course.id} 
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      <Link 
                        to={`/courses/${course.id}`} 
                        className="hover:text-blue-400 transition-colors"
                      >
                        {course.title}
                      </Link>
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-3">{course.description}</p>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration || '8 hours'}
                      </div>
                      <span className="text-sm font-medium text-blue-400">
                        {Math.round(progress[course.id] || 0)}% complete
                      </span>
                    </div>

                    <div className="w-full h-2 bg-gray-700 rounded-full mb-4">
                      <div
                        style={{ width: `${progress[course.id] || 0}%` }}
                        className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      ></div>
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      {progress[course.id] >= 100 ? 'View Course' : 'Continue Learning'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;