import './reset.css';
import './global.css';
import './custom.css';
//import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Header from './components/Header';
import Courses from './components/Courses';
import CourseCreate from './components/CourseCreate';
import CourseUpdate from './components/CourseUpdate';
import CourseDelete from './components/CourseDelete';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Error from './components/Error'
import Forbidden from './components/Forbidden';
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
            <Route path="/courses/:courseId/update" element={<CourseUpdate />} />
            <Route path="/courses/:courseId/delete" element={<CourseDelete />} />
            <Route path="/courses/create" element={<CourseCreate />} />
        </Route>
        <Route path="/error" element={<Error />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
      
    </div>
  );
}

export default App;
