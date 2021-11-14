import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import NotFound from './Components/NotFound';

import './styles/App.css';

const App = () => {
  
  return (
    <Router>
      <div className="App">
            <Header />
            <Courses />
            <Routes>
              <Route path="/" element={<Courses/>} />
              <Route path="/courses/" element={<CourseDetail/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
      </div>
    </Router>

  );
}

ReactDOM.render(
    <App />,
  document.getElementById("root")
);

export default App;
