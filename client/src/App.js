import './reset.css';
import './global.css';
import './custom.css';
//import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import NotFound from './components/NotFound';
import Error from './components/Error'

function App() {
  

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/courses/:courseId/update" element={<UpdateCourse />} />
        <Route path="/error" element={<Error />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />

      </Routes>
      
    </div>
  );
}

export default App;
