import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UserContext from "../context/UserContext";
import Markdown from 'react-markdown';

const CourseDetail = () => {
    let {courseId} = useParams();
    const navigate = useNavigate();
    
    const [course, setCourse] = useState({});
    const { authUser } = useContext(UserContext);
    let authUserId = -1;
    if(authUser){
        authUserId = authUser.id;
    }

    useEffect( ()=> {
        //run fetch once component is mounted
        console.log("---USE EFFECT GET COURSE!");
        const getCourse = async (id) =>{
            let courseUrl = `http://localhost:5000/api/courses/${id}`;
            console.log(`----FETCHING COURSE ${courseUrl}...`);
            await fetch(courseUrl, {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(res => {
                if(res.status === 404){
                    console.log("---NO COURSE FOUND");
                    navigate("/notfound");
                }else{
                    console.log("---COURSE FOUND");
                }
                return res;
            })
            .then(res => res.json())
            .then(data => {
                //console.log("---getCourse - see materials from data object:");
                //adding a new property because it can't seem to read {course.courseOwner.firstName}, etc...
                //But this new property below works!
                data.owner = `${data.courseOwner.firstName} ${data.courseOwner.lastName}`;
    
                //console.log(data);
                setCourse(data);
    
                console.log("----COURSE OWNER:");
                console.log(data.owner);
            })
            .catch(error => {
                console.log("----ERROR FROM getCourses!!");
                console.log(error);
            });
        };
        getCourse(courseId);
    },[]);

    return(
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {(course.userId === authUserId)? <><Link className="button" to={`./update`} relative="path">Update Course</Link><Link className="button" to={`./delete`} relative="path">Delete Course</Link></> : ""}
                    <Link className="button button-secondary" to={`/courses`} relative="path">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course Title</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.owner}</p>

                            <p>
                                <Markdown>
                                    {course.description}
                                </Markdown>
                            </p>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <Markdown>
                                {course.materialsNeeded}
                                </Markdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )



}

export default CourseDetail;