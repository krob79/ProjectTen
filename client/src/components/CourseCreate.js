import React from 'react';
import ErrorDisplay from './ErrorDisplay';
import { Link, useNavigate } from 'react-router-dom';
import {useState, useContext} from 'react';
import UserContext from "../context/UserContext";

const CourseCreate = () => {
    //default structure for the course object
    const courseObj = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: [""],
        courseOwner: {}
    }
    //state for course object
    const [course, setCourse] = useState(courseObj);
    //state for list of errors that will appear if there's a problem creating the course
    const [errors, setErrors] = useState([]);
    //Need information about current authUser to add to the newly created course, plus credentials to authorize the creation of a new course
    const { authUser, credentials } = useContext(UserContext);
    //navigate is used to take the user back to the main courses page after the course has been created
    const navigate = useNavigate();

    //onUpdateHandler references the name attribute from an input field and updates a course property with the same name with a text value
    const onUpdateHandler = (e) => {
        //name attribute in the input fields must match the course property
        let objKey = e.target.name;
        updateCourseInfo(objKey, e.target.value);
    }
    //updates a single property in the course object
    const updateCourseInfo = (property, value) => {
        //console.log("---UPDATING COURSE INFO");
        //copy current version of course
        let courseCopy = {
            ...course,
            courseOwner: {
                id: authUser.id,
                firstName: authUser.firstName,
                lastName: authUser.lastName,
                emailAddress: authUser.emailAddress
            }
        };
        //update whatever property is referenced
        courseCopy[property] = value;     
        setCourse(courseCopy);
    }

    //processes the form that has all of the data on the new course
    const handleSubmit = async(event) => {
        event.preventDefault();

        //let fetchUrl = `http://localhost:5000/api/courses`;
        let fetchUrl = `https://projectten-production.up.railway.app/api/courses`;

        const postData = JSON.stringify({
            ...course
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
                //send user back to courses main page after course creation is complete
                navigate(`/courses/`);
            });
            
    }

    return(
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {/* ErrorDisplay will only appear if the list of errors is at least 1 */}
                {(errors.length > 0) ? <ErrorDisplay errorList={errors}/> : ""}
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
                            <textarea id="materialsNeeded" name="materialsNeeded" onInput={onUpdateHandler}></textarea>
                        </div>
                        
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <Link className="button button-secondary" to={`/courses`} relative="path">Cancel</Link>
                </form>
            </div>
        </main>


    );
}

export default CourseCreate;