import React from 'react';
import ErrorDisplay from './ErrorDisplay';
import { Link, Navigate } from 'react-router-dom';
import {useState} from 'react';
import BasicList from './BasicList';


const CreateCourse = () => {
    const courseObj = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: [""],
        courseOwner: {
            id: 1,
            firstName: "Joe",
            lastName: "Smith",
            emailAddress: "joe@smith.com"
        }
    }

    const [course, setCourse] = useState(courseObj);
    const [errors, setErrors] = useState([]);

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
        console.log("---CreateCourse.js - onListUpdate");
        //console.log(list);
        updateCourseInfo("materialsNeeded", list);
    }

    const updateCourseInfo = (property, value) => {
        console.log("---UPDATING COURSE INFO");
        //copy current version of course
        let courseCopy = {
            ...course,
        };
        //update whatever property is referenced
        courseCopy[property] = value;
        //console.log("---NEW COURSE:");
        console.log(courseCopy);      
        setCourse(courseCopy);

    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        let fetchUrl = `http://localhost:5000/api/courses`;

        let formData = JSON.stringify({
            ...course
        });

        //reset error list
        setErrors([]);

        await fetch(fetchUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: formData,
            })
            .then(res => res.json())
            .then(data => {
                //populate the array that contains all of the error messages
                let message = [];
                if (typeof data.message === 'string' || data.message instanceof String){
                    message.push(data.message);
                }else if(Array.isArray(data.message)){
                    message = data.message;
                }
                setErrors(message);
                console.log(data)
            })
            //This cataches the error, but the error is that no response has been returned...which is intended from the REST API
            //So...not sure what if anything needs to be changed here, because the creation of the database entry seems to work!
            .catch(error => console.log(`----NO RESPONSE DATA ${error}`));
    }

    return(
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {(errors.length > 0) ? <ErrorDisplay errorList={errors}/> : ""}
                {/* Disable Submit on Enter key */}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input onInput={onUpdateHandler} id="courseTitle" name="title" type="text" />
                            <p>by USER NAME ADDED HERE</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea onInput={onUpdateHandler} id="courseDescription" name="description" />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input onInput={onUpdateHandler} id="estimatedTime" name="estimatedTime" type="text" />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <BasicList list={course.materialsNeeded} onUpdate={onListUpdate}/>
                        </div>
                        
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <Link className="button button-secondary" to={`/courses`} relative="path">Cancel</Link>
                </form>
            </div>
        </main>


    );
}

export default CreateCourse;