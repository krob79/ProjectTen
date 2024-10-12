import React from 'react';
import ErrorDisplay from './ErrorDisplay';
import { Link, useNavigate } from 'react-router-dom';
import {useState, useContext} from 'react';
import UserContext from "../context/UserContext";
import BasicList from './BasicList';
import { createMaterialsString } from "../utils/listHelper";


const CreateCourse = () => {
    const courseObj = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: [""],
        courseOwner: {}
    }

    const [course, setCourse] = useState(courseObj);
    const [errors, setErrors] = useState([]);
    const { authUser, credentials } = useContext(UserContext);
    const navigate = useNavigate();

    let courseOwner = {
        id: authUser.id,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        emailAddress: authUser.email
    }

    //these next two update handlers essentially do the same thing
    //onUpdateHandler references the name attribute from an input field and updates a course property with the same name with a text value
    const onUpdateHandler = (e) => {
        //console.log(`---onUpdateHandler: ${e.target.value}`);
        //name attribute in the input fields must match the course property
        let objKey = e.target.name;
        updateCourseInfo(objKey, e.target.value);
    }

    //onListUpdate updates a specific "materialsNeeded" property with an array
    const onListUpdate = (list) => {
        //console.log("---CreateCourse.js - onListUpdate");
        //console.log(list);
        updateCourseInfo("materialsNeeded", list);
    }

    const updateCourseInfo = (property, value) => {
        //console.log("---UPDATING COURSE INFO");
        //copy current version of course
        let courseCopy = {
            ...course,
            courseOwner: {
                ...courseOwner
            }
        };
        //update whatever property is referenced
        courseCopy[property] = value;
        //console.log("---NEW COURSE:");
        //console.log(courseCopy);      
        setCourse(courseCopy);

    }

      const handleSubmit = async(event) => {
        event.preventDefault();

        let fetchUrl = `http://localhost:5000/api/courses`;

        let courseOwner = {
            id: authUser.id,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            emailAddress: authUser.emailAddress
        }

        let materialString = createMaterialsString(course.materialsNeeded);

        const postData = JSON.stringify({
            ...course,
            materialsNeeded: materialString
        });

        //reset error list
        setErrors([]);

        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

        await fetch(fetchUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`
            },
            method: "POST",
            body: postData,
            })
            .then(res => res.json())
            .then(data => {
                console.log("-----NEW COURSE CREATED!");
                console.log(data);
                //populate the array that contains all of the error messages
                let message = [];
                //if it's a string, push it into an array!
                if (typeof data.message === 'string' || data.message instanceof String){
                    message.push(data.message);
                //if it's already an array, use it!
                }else if(Array.isArray(data.message)){
                    message = data.message;
                }
                setErrors(message);
                console.log(data)
            })
            //This cataches the error, but the error is that no response has been returned...which is intended from the REST API
            //So...not sure what if anything needs to be changed here, because the creation of the database entry seems to work!
            .catch(error => {
                console.log(`----NO RESPONSE DATA ${error}`);
                navigate(`/courses/`);
            });
            
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
                            <p>by {authUser.firstName} {authUser.lastName}</p>
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