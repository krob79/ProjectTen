import React, {useEffect, useState} from 'react';
//import { Link } from 'react-router-dom';
import Data from '../Data';


//let CourseDetail use the Data object to pull course info so that it stays in sync.
const CourseDetail = (props) => {
    let id = props.match.params.id;

    var data = new Data();
        const [courses, setCourses] = useState([]);

        useEffect( () => {
            let mounted = true;
            console.log('---firing!');
            data.getCourse(id)
            .then((response) => {
                if(mounted){
                    setCourses(response);
                    console.log("---response: " + response.owner.firstName);
                }
            })
            .catch((error) => {
                console.log("----ERROR: " + error);
            })

            return () => mounted = false;
            
        }, []);

    return(
        <main>
                <div className="actions--bar">
                    <div className="wrap">
                        <a className="button" href="update-course.html">Update Course</a>
                        <a className="button" href="#">Delete Course</a>
                        <a className="button button-secondary" href="index.html">Return to List</a>
                    </div>
                </div>
                
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{courses.title}</h4>
                                <p>{courses.owner.firstName}</p>

                                <p>{courses.description}</p>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{courses.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    {courses.materialsNeeded}
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
    )




}

export default CourseDetail;