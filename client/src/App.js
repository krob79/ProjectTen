import './reset.css';
import './global.css';
import './custom.css';
//import './App.css';
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';

function App() {

  const userInfo = {
    firstName: 'React',
    lastName: 'React',
    emailAddress: 'react@react.com',
    password: 'react'
  }

  const createUser = async () =>{
    await fetch(`http://localhost:5000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
      console.log("----CREATING USER:");
      console.log(data);
    })
    .catch(error => {
      console.log("----ERROR FROM createUser!!");
      console.warn(error);
    });
  }

  return (
    <div className="App">
      <Header />
      <UserSignIn />
    </div>
  );
}

export default App;
