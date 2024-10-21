import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import ErrorDisplay from './ErrorDisplay';

const DeleteCourse = () => {
    //need the course data to verify that the course owner is the same as the current user before deleting
    const [course, setCourse] = useState({});
    const [errors, setErrors] = useState([]);
    let {courseId} = useParams();
    //Need information about current authUser to add to the newly created course, plus credentials to authorize the creation of a new course
    const { authUser, credentials } = useContext(UserContext);
    //use to direct user to appropriate display
    const navigate = useNavigate();

    useEffect( () => {
        //run fetch once component is mounted
        getCourse();
    },[]);

    const getCourse = async () =>{
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
                navigate("/notfound");
            //otherwise, kick user to "forbidden" if this course's userId doesn't match the user's id
            }else if(data.userId !== authUser.id){
                navigate("/forbidden");
            }
            
            //adding a new property because it can't seem to read {course.courseOwner.firstName}, etc...
            //But this new property below works!
            data.owner = `${data.courseOwner.firstName} ${data.courseOwner.lastName}`;
            
            //set the course data
            setCourse(data);
            
        })
        .catch(error => {
            console.log("----ERROR FROM getCourses!!");
            navigate("/error");
        });
    }
    //processes the form that has all of the data on the new course
    const handleSubmit = async(event) => {
        event.preventDefault();

        let fetchUrl = `http://localhost:5000/api/courses/${courseId}`;

        //reset error list
        setErrors([]);

        //get credentials ready to pass in for API call
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

        await fetch(fetchUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`
            },
            method: "DELETE"
            })
            .then(res => {
                //this means delete was successful - send user back to courses page
                if(res.status === 204){
                    console.log("---COURSE FOUND BUT NO CONTENT RETURNED");
                    navigate(`/courses/`);
                }else if(res.status === 404){
                    console.log("---NO COURSE FOUND");
                }
                return res;
            })
            .then(res => res.json())
            .then(data => {
                console.log("----UPDATED DATA");
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
            })
            //This cataches the error, but the error is that no response has been returned...which is intended from the REST API
            //So...not sure what if anything needs to be changed here, because the creation of the database entry seems to work!
            .catch(error => {
                console.log(`----NO RESPONSE DATA ${error}`);
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
                        {(course.userId === authUser.id)?<><button className="button" type="submit">Delete Course</button><Link className="button button-secondary" to={`/courses/${course.id}`} relative="path">Cancel</Link></>:""}
                    </div>
                </form>
            </div>
        </main>
    )

}

export default DeleteCourse;