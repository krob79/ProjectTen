import React from 'react';
import {useEffect, useState} from 'react';

const CourseDetail = ({courseId}) => {

    useEffect( ()=> {
        //run fetch once component is mounted
        getCourse(courseId);
    },[]);

    const [course, setCourse] = useState({});
    const [materials, setMaterials] = useState([]);

    const getCourse = async (courseId) =>{
        let courseUrl = `http://localhost:5000/api/courses/${courseId}`;
        console.log(`----FETCHING COURSE ${courseUrl}...`);
        await fetch(courseUrl, {
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(data => {
        
        console.log("---getCourse - see materials from data object:");
        

        //adding a new property because it can't seem to read {course.courseOwner.firstName}, etc...
        //But this new property below works!
        data.owner = `${data.courseOwner.firstName} ${data.courseOwner.lastName}`;
        data.materialsNeeded = createMaterialsList(data.materialsNeeded);
        //console.log(data.materialsNeeded);
        console.log(data);
        setCourse(data);

        })
        .catch(error => {
        console.log("----ERROR FROM getCourses!!");
        console.warn(error);
        });

        
    }


    const createMaterialsList = (list) => {
        let result = ['No Materials Listed'];
        //console.log("---USING THE FOLLOWING MATERIAL LIST:");
        //console.log(list);
        if (typeof list === 'string' || list instanceof String){
            console.log("---Creating Materials List, String detected, splitting into Array");
            if(list.includes('\n')){
                result = list.split('\n');
            }else if(list.includes(',')){
                result = list.split(',');
            }else{
                //how many things are we going to check for here...?
                result = list;
            }
        }else if(Array.isArray(list)){
            console.log("---Creating Materials List, Array detected");
            result = list;
        }

        return result;
        
    }

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
                            <h3 className="course--detail--title">Course Title</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.owner}</p>

                            <p>{course.description}</p>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {
                                    materials.map( (item,i) => {
                                        //console.log(item);
                                        if(item){
                                            return(
                                                <li key={`item${i}`}>{item}</li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )



}

export default CourseDetail;