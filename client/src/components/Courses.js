import React from 'react';
import {useEffect, useState, useContext} from 'react';
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {

    useEffect( ()=> {
        //run fetch once component is mounted
        getCourses();
    },[]);
    //state for full list of courses to display
    const [courseList, setCourseList] = useState([]);
    //small feature - check the current user if logged in, this will be used to provide visual mark on all courses made by them
    const { authUser } = useContext(UserContext);
    //used to bounce user to error page
    const navigate = useNavigate();
    let authUserId = -1;
    if(authUser){
        authUserId = authUser.id;
    }

    //makes the call to the api to retrieve data for all courses
    const getCourses = async () =>{
        await fetch(`http://localhost:5000/api/courses/`, {
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(data => {
            console.log("----FETCHING COURSES...");
            //set data to state once found
            setCourseList(data);
        })
        .catch(error => {
            console.log("----ERROR FROM getCourses!!");
            console.warn(error);
            //bounce user to error page if something
            navigate('/error');
        });
    }

    return(
        <div>
            <main>
                <div className="wrap main--grid">
                {
                    courseList.map((course, i)=>{
                        return(
                            
                            <Link key={`key${i}`} className="course--module course--link" to={`./${course.id}`} relative="path">
                                <h2 className="course--label">Course {(course.courseOwner.id === authUserId)? "*" : ""}</h2>
                                <h3 className="course--title">{course.title}</h3>
                            </Link>
                            
                        )
                    })
                }
                    <Link to={`/courses/create`} className="course--module course--add--module">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                              New Course
                        </span>
                    </Link>
                    {authUser?<p className="course-grid-top">* indicates a course you have created</p>:""}
                </div>
            </main>
        </div>

    );

}

export default Courses;