import './reset.css';
import './global.css';
import './custom.css';
//import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import DeleteCourse from './components/DeleteCourse';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Error from './components/Error'
import PrivateRoute from './components/PrivateRoute';

function App() {
  

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route element={<PrivateRoute />}>
            <Route path="/courses/:courseId/update" element={<UpdateCourse />} />
            <Route path="/courses/:courseId/delete" element={<DeleteCourse />} />
            <Route path="/courses/create" element={<CreateCourse />} />
        </Route>
        <Route path="/error" element={<Error />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
      
    </div>
  );
}

export default App;
