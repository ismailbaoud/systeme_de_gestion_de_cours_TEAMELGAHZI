import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router';

const LessonDetailsPage = () => {
  const { lesson_id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/lessons/findOne/${lesson_id}`);
        if (response.data) {
          setLesson(response.data);
        } else {
          setError('Lesson not found');
        }
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lesson_id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700 max-w-md">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-white">{error}</h3>
          <div className="mt-6">
            <Link 
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-900 to-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white">{lesson?.title}</h1>
                <p className="mt-2 text-gray-300">{lesson?.description}</p>
              </div>
              <Link 
                to={`/courses/${lesson.module_id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                Back to Course
              </Link>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="">
              <h2 className="text-2xl font-semibold text-white">Lesson Video</h2>
              {lesson?.content ? (
                <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={`http://localhost:3000${lesson.content}`}
                    title={lesson.title}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gray-700 rounded-lg p-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-gray-400">No video available for this lesson</p>
                </div>
              )}
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailsPage;