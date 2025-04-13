import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router';

const DetailsPage = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(null);
  const userId = localStorage.getItem('user_id');

  const handleEnroll = async () => {
    if (!userId) {
      alert('You need to be logged in to enroll.');
      return;
    }
    
    try {
      const response = await axios.post(`http://localhost:3000/enrollement/create`, { 
        user_id: userId,
        course_id: course_id 
      });

      if (response.status === 200) {
        alert('Enrollment successful!');
      }
    } catch (error) {
      console.error('Error enrolling user:', error);
      alert('Failed to enroll. Please try again.');
    }
  };

  const handleLessonCompletion = async (lessonId, isCompleted) => {
    try {
      const response = await axios.put(`http://localhost:3000/lessons/${lessonId}/complete`, {
        user_id: userId,
        completed: isCompleted ? true : 0
      });
      
      

      if (response.status === 200) {
        const updatedLessons = { ...lessons };
        for (const moduleId in updatedLessons) {
          updatedLessons[moduleId] = updatedLessons[moduleId].map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, done: isCompleted ? 1 : 0 };
            }
            return lesson;
          });
        }
        setLessons(updatedLessons);
      }
    } catch (error) {
      console.error('Error updating lesson completion:', error);
      alert('Failed to update lesson status. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const courseResponse = await axios.get(`http://localhost:3000/courses/${course_id}`);
        setCourse(courseResponse.data.course);
        
        const modulesResponse = await axios.get(`http://localhost:3000/courses/${course_id}/modules`);
        const modulesData = modulesResponse.data.modules || [];
        setModules(modulesData);
        
        const lessonsData = {};
        for (const module of modulesData) {
          try {
            const lessonsResponse = await axios.get(`http://localhost:3000/courses/${module.id}/lessons`, {
              params: { user_id: userId }
            });
            lessonsData[module.id] = lessonsResponse.data.lessons || [];
          } catch (error) {
            console.error(`Error fetching lessons for module ${module.id}`, error);
            lessonsData[module.id] = [];
          }
        }
        setLessons(lessonsData);
        
        if (modulesData.length > 0) {
          setActiveModule(modulesData[0].id);
          // window.location.reload();
        }
      } catch (error) {
        console.error('Error fetching course data', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [course_id, userId]);

  const getModuleColor = (index) => {
    const colors = [
      'bg-blue-900/50 text-blue-300 border-blue-700',
      'bg-green-900/50 text-green-300 border-green-700',
      'bg-purple-900/50 text-purple-300 border-purple-700',
      'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      'bg-pink-900/50 text-pink-300 border-pink-700',
      'bg-indigo-900/50 text-indigo-300 border-indigo-700'
    ];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto p-8 text-center bg-gray-900 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-white">Course not found</h1>
        <Link to="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="bg-gradient-to-r from-blue-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
              <p className="mt-3 text-xl max-w-3xl text-gray-300">{course.description}</p>
            </div>
            <div className="mt-4 md:mt-0">
              
              <button 
                onClick={handleEnroll} 
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
              <div className="p-6 bg-gray-900 text-white border-b border-gray-700">
                <h2 className="text-2xl font-bold">Course Modules</h2>
              </div>
              <div className="divide-y divide-gray-700">
                {modules.length === 0 ? (
                  <div className="p-6 text-gray-400">No modules available</div>
                ) : (
                  modules.map((module, index) => (
                    <div 
                      key={module.id}
                      className={`p-6 cursor-pointer transition ${activeModule === module.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                      onClick={() => setActiveModule(module.id)}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${getModuleColor(index)} font-bold`}>
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                          <p className="mt-1 text-gray-400 line-clamp-2">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            {activeModule ? (
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                <div className="p-6 bg-gray-900 text-white border-b border-gray-700">
                  <h2 className="text-2xl font-bold">
                    {modules.find(m => m.id === activeModule)?.title || 'Lessons'}
                  </h2>
                  <p className="mt-1 text-gray-400">
                    {modules.find(m => m.id === activeModule)?.description || ''}
                  </p>
                </div>
                <div className="p-6">
                  {lessons[activeModule] && lessons[activeModule].length > 0 ? (
                    <div className="space-y-4">
                      {lessons[activeModule].map((lesson, index) => (
                        <div key={lesson.id} className="border border-gray-700 rounded-lg p-5 hover:border-blue-500 transition bg-gray-700/50">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-300 font-bold">
                              {index + 1}
                            </div>
                            <div className="ml-4 flex-grow">
                              <Link 
                                to={`/lessons/${lesson.id}`}
                                className="text-lg font-semibold text-white hover:text-blue-400 transition"
                              >
                                {lesson.title}
                              </Link>
                              <div className="mt-2 flex items-center text-sm text-gray-400">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                15 min
                              </div>
                            </div>
                            <div className="ml-4 flex items-center">
                              <input
                                type="checkbox"
                                checked={lesson.done === 1 || lesson.done === true}
                                onChange={(e) => handleLessonCompletion(lesson.id, e.target.checked)}
                                disabled={lesson.done === 1 || lesson.done === true}
                                className={`h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                                  lesson.done === 1 || lesson.done === true ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                                }`}
                              />
                              <span className="ml-2 text-sm text-gray-300">
                                {lesson.done === 1 || lesson.done === true ? 'Completed' : 'Mark as complete'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-white">No lessons available</h3>
                      <p className="mt-1 text-gray-400">This module doesn't contain any lessons yet.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8 text-center border border-gray-700">
                <h3 className="text-lg font-medium text-white">Select a module to view its lessons</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailsPage;