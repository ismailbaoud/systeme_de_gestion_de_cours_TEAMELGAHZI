import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/DetailsPage';
import CreateCoursePage from './pages/CreateCoursePage';
import CreateLessonPage from './pages/CreateLessonPage';
import CreateModulePage from './pages/CreateModulePage';
import LessonDetailsPage from './pages/LessonDetailsPage';
import DashboardPage from './pages/DashboardPage';
import Register from './pages/RegisterPage';
import Logout from './pages/LogoutPage';
import Login from './pages/loginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/create" element={<CreateCoursePage />} />
          <Route path="/lessons/create" element={<CreateLessonPage />} />
          <Route path="/modules/create" element={<CreateModulePage />} />
          <Route path="/courses/:course_id" element={<CourseDetailPage />} />
          <Route path="/lessons/:lesson_id" element={<LessonDetailsPage />} />
          <Route path="/lessons/:lesson_id" element={<LessonDetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
