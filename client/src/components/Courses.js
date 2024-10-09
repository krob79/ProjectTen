import React from 'react';
import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

const Courses = () => {

    useEffect( ()=> {
        //run fetch once component is mounted
        getCourses();
    },[]);

    const [courseList, setCourseList] = useState([]);


    const getCourses = async () =>{
        await fetch(`http://localhost:5000/api/courses/`, {
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(data => {
        console.log("----FETCHING COURSES...");
        //console.log(data);
        setCourseList(data);
        //return(data);
        })
        .catch(error => {
        console.log("----ERROR FROM getCourses!!");
        console.warn(error);
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
                                <h2 className="course--label">Course</h2>
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
                </div>
            </main>
        </div>

//<svg fill="#000000" version="1.1" viewBox="144 144 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="m400 616.87c-57.516-0.003906-112.68-22.852-153.35-63.523-40.668-40.668-63.516-95.832-63.516-153.35s22.848-112.68 63.52-153.35c40.668-40.672 95.832-63.52 153.35-63.52s112.68 22.848 153.35 63.516c40.672 40.672 63.52 95.832 63.523 153.35-0.066406 57.5-22.934 112.62-63.59 153.29-40.66 40.656-95.785 63.523-153.29 63.59zm0-417.99v-0.003906c-39.777 0.003906-78.664 11.797-111.74 33.898-33.074 22.102-58.852 53.512-74.074 90.266-15.223 36.75-19.203 77.188-11.441 116.2 7.7617 39.016 26.918 74.852 55.043 102.98 28.129 28.129 63.969 47.285 102.98 55.043 39.016 7.7617 79.457 3.7773 116.21-11.445 36.75-15.227 68.16-41.004 90.258-74.078 22.102-33.078 33.895-71.961 33.895-111.74-0.058594-53.324-21.27-104.45-58.977-142.15-37.703-37.707-88.828-58.914-142.15-58.973z"></path> <path d="m506.18 412.11h-203.91c-4.3477 0-7.8711-3.5234-7.8711-7.8711s3.5234-7.8711 7.8711-7.8711h203.91c4.3477 0 7.875 3.5234 7.875 7.8711s-3.5273 7.8711-7.875 7.8711z"></path> </g> </g></svg>
    );

}

export default Courses;