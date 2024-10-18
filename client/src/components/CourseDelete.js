import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import UserContext from '../context/UserContext';
import { createMaterialsArray, createMaterialsString } from "../utils/listHelper";
import ErrorDisplay from './ErrorDisplay';

const DeleteCourse = () => {
    let {courseId} = useParams();
    const [course, setCourse] = useState({});
    const [errors, setErrors] = useState([]);
    const { authUser, credentials } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect( () => {
        //run fetch once component is mounted
        //console.log("----UPDATE COURSE - USE EFFECT");
        getCourse(courseId);
    },[]);

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
            //kick user to "notfound" if this course id doesn't exist
            if(!data.id){
                console.log("----THIS COURSE ID IS NOT FOUND ");
                navigate("/notfound");
            //otherwise, kick user to "forbidden" if this course's userId doesn't match the user's id
            }else if(data.userId != authUser.id){
                console.log("----THESE DON'T MATCH: ");
                navigate("/forbidden");
            }
            console.log("---getCourse - see materials from data object:");
            //adding a new property because it can't seem to read {course.courseOwner.firstName}, etc...
            //But this new property below works!
            data.owner = `${data.courseOwner.firstName} ${data.courseOwner.lastName}`;
            //convert string of materials to array
            data.materialsNeeded = createMaterialsArray(data.materialsNeeded);
            console.log(data);
            //set the course data
            setCourse(data);
            
        })
        .catch(error => {
            console.log("----ERROR FROM getCourses!!");
            navigate("/error");
        });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        let fetchUrl = `http://localhost:5000/api/courses/${courseId}`;

        let materialString = createMaterialsString(course.materialsNeeded);

        const putData = JSON.stringify({
            ...course,
            materialsNeeded: materialString
        });

        //reset error list
        setErrors([]);

        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

        console.log("----SENDING DATA");
        console.log(credentials);
        console.log(putData);

        await fetch(fetchUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`
            },
            method: "DELETE"
            })
            .then(res => {
                console.log("----UPDATED DATA");
                console.log(res);
                if(res.status == 404){
                    console.log("---NO COURSE FOUND");
                    //navigate("/notfound");
                }else if(res.status == 204){
                    console.log("---COURSE FOUND BUT NO CONTENT RETURNED");
                    navigate(`/courses/`);
                }
                return res;
            })
            .then(res => res.json())
            .then(data => {
                console.log("----UPDATED DATA");
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
                //navigate(`/courses/`);
            });
            
    }


    return(
        <main>
            
            <div className="wrap">
                <h2>Delete Course</h2>
                {(errors.length > 0) ? <ErrorDisplay errorList={errors}/> : ""}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <p>Are you sure you want to delete this course?</p>
                        </div>
                        <div>
                        
                            
                        </div>
                    </div>
                    <div className="updateButtonRow">
                        {(course.userId == authUser.id)?<><button className="button" type="submit">Delete Course</button><Link className="button button-secondary" to={`/courses/${course.id}`} relative="path">Cancel</Link></>:""}
                    </div>
                </form>
            </div>
        </main>
    )

}

export default DeleteCourse;