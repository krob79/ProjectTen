import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import NotFound from './Components/NotFound';

import './styles/App.css';

const App = () => {
  
  return (
    <BrowserRouter>
      <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Courses} />
              <Route path="/courses/:id" component={CourseDetail}/>
              <Route path="*" component={NotFound}/>
            </Switch>
      </div>
    </BrowserRouter>

  );
}

ReactDOM.render(
    <App />,
  document.getElementById("root")
);

export default App;
