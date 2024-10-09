import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import BasicList from './BasicList';

const UpdateCourse = () => {
    let {courseId} = useParams();
    const [course, setCourse] = useState({});

    useEffect( () => {
        //run fetch once component is mounted
        //console.log("----UPDATE COURSE - USE EFFECT");
        getCourse(courseId);
    },[]);
    
    //these next two update handlers essentially do the same thing
    //onUpdateHandler references the name attribute from an input field and updates a course property with the same name with a text value
    const onUpdateHandler = (e) => {
        console.log(`---onUpdateHandler: ${e.target.value}`);
        //name attribute in the input fields must match the course property
        let objKey = e.target.name;
        updateCourseInfo(objKey, e.target.value);
    }
    //onListUpdate updates a specific "materialsNeeded" property with an array
    const onListUpdate = (list) => {
        console.log("---UpdateCourse.js - onListUpdate");
        console.log(list);
        updateCourseInfo("materialsNeeded", list);
    }

    const updateCourseInfo = (property, value) => {
        //copy current version of course
        let courseCopy = {
            ...course,
        };
        //update whatever property is referenced
        courseCopy[property] = value;
        //console.log("---NEW COURSE:");
        //console.log(courseCopy);      
        setCourse(courseCopy);

    }

    const getCourse = async (courseId) =>{
        let courseUrl = `http://localhost:5000/api/courses/${courseId}`;
        //console.log(`----UPDATE COURSE FETCHING COURSE ${courseUrl}...`);
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
        //convert string of materials to array
        data.materialsNeeded = createMaterialsList(data.materialsNeeded);
        console.log(data);
        //set the course data
        setCourse(data);
            
        })
        .catch(error => {
        console.log("----ERROR FROM getCourses!!");
        return <Navigate to={"/notfound"} />
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
            }
        }else if(Array.isArray(list)){
            console.log("---Creating Materials List, Array detected");
            result = list;
        }

        return result;
        
    }

    return(
        <main>
            
            <div className="wrap">
                <h2>Update Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name"><input id="courseTitle" name="title" type="text" onInput={onUpdateHandler} value={course.title || ""} /></h4>
                            <p>By {course.owner}</p>

                            <textarea className="textareaUpdate" name="description" onInput={onUpdateHandler} value={course.description || ""}></textarea>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <input id="estimatedTime" name="estimatedTime" onInput={onUpdateHandler} type="text" value={course.estimatedTime || ""}/>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <BasicList list={course.materialsNeeded} onUpdate={onListUpdate}/>
                        </div>
                    </div>
                    <div className="updateButtonRow">
                        <button class="button" type="submit">Update Course</button><Link className="button button-secondary" to={`/courses`} relative="path">Cancel</Link>
                    </div>
                </form>
            </div>
        </main>
    )

}

export default UpdateCourse;