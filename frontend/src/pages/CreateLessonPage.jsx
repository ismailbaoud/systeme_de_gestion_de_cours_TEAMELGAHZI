import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const CreateLessonPage = () => {
  const [lesson, setLesson] = useState({
    title: '',
    description: '',
    module_id: '',
    order: 1,
  });

  const [videoFile, setVideoFile] = useState(null);
  const [modules, setModules] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get('http://localhost:3000/module/findAll');
        const data = res.data;
        if (Array.isArray(data.modules)) {
          setModules(data.modules);
        } else if (Array.isArray(data)) {
          setModules(data);
        } else {
          setModules([]);
        }
      } catch (err) {
        console.error('Error fetching modules:', err);
        setError('Failed to load modules');
        setModules([]);
      }
    };

    fetchModules();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
    if (error) setError('');
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');

    if (!lesson.title || !lesson.description || !lesson.module_id || !videoFile) {
      setError('All fields and video are required');
      setIsSubmitting(false);
      return;
    }
const id = localStorage.getItem('user_id')
    try {
      const formData = new FormData();
      formData.append('title', lesson.title);
      formData.append('description', lesson.description);
      formData.append('module_id', lesson.module_id);
      formData.append('order', lesson.order);
      formData.append('user_id', id);
      formData.append('file', videoFile);

      const response = await axios.post('http://localhost:3000/lessons/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Lesson created successfully!');
      setLesson({ title: '', description: '', module_id: '', order: 1 });
      setVideoFile(null);
      
      setTimeout(() => {
        navigate(`/`);
      }, 1500);
    } catch (error) {
      console.error('Error creating lesson:', error);
      setError(error.response?.data?.message || 'Error creating lesson');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create New Lesson</h1>
          <p className="mt-2 text-gray-400">Add a new lesson to your module</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="mb-6 bg-green-900/50 border-l-4 border-green-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-200">{message}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Lesson Title</label>
            <input
              type="text"
              name="title"
              value={lesson.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={lesson.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Module</label>
            <select
              name="module_id"
              value={lesson.module_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="" className="text-gray-500">-- Select a Module --</option>
              {modules.map(module => (
                <option key={module.id} value={module.id} className="text-white">
                  {module.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Lesson Video</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-400">
                    {videoFile ? (
                      <span className="font-medium text-blue-400">{videoFile.name}</span>
                    ) : (
                      <span>Click to upload video (MP4)</span>
                    )}
                  </p>
                </div>
                <input 
                  type="file" 
                  accept="video/*" 
                  onChange={handleFileChange} 
                  required 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
            <input
              type="number"
              name="order"
              value={lesson.order}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300 flex justify-center items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : 'Create Lesson'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-md transition duration-300"
            >
              Go to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLessonPage;