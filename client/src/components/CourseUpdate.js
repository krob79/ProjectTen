import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import UserContext from '../context/UserContext';
import ErrorDisplay from './ErrorDisplay';
import Markdown from 'react-markdown';

const CourseUpdate = () => {
    let {courseId} = useParams();
    const [course, setCourse] = useState({});
    const [errors, setErrors] = useState([]);
    const { authUser, credentials } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect( () => {
        //run fetch once component is mounted
        getCourse();
    },[]);
    

    //onUpdateHandler references the name attribute from an input field and updates a course property with the same name with a text value
    const onUpdateHandler = (e) => {
        console.log(`---onUpdateHandler: ${e.target.value}`);
        //name attribute in the input fields must match the course property
        let objKey = e.target.name;
        updateCourseInfo(objKey, e.target.value);
    }

    //updates one property of the course
    const updateCourseInfo = (property, value) => {
        //copy current version of course
        let courseCopy = {
            ...course,
        };
        //update whatever property is referenced
        courseCopy[property] = value;      
        setCourse(courseCopy);

    }

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
                console.log("----THIS COURSE ID IS NOT FOUND ");
                navigate("/notfound");
            //otherwise, kick user to "forbidden" if this course's userId doesn't match the user's id
            }else if(data.userId !== authUser.id){
                console.log("----THESE DON'T MATCH: ");
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
            //kick user to "error" if other error pops up
            navigate("/error");
        });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        let fetchUrl = `http://localhost:5000/api/courses/${courseId}`;

        const putData = JSON.stringify({
            ...course
        });

        //reset error list
        setErrors([]);

        //prepares credentials for API call
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

        await fetch(fetchUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`
            },
            method: "PUT",
            body: putData,
            })
            .then(res => {
                console.log("----UPDATED DATA");
                console.log(res);

                if(res.status === 204){
                    console.log("---COURSE FOUND BUT NO CONTENT RETURNED");
                    navigate(`/courses/${courseId}`);
                }else if(res.status === 404){
                    console.log("---NO COURSE FOUND");
                }
                return res;
            })
            .then(res => res.json())
            .then(data => {
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
                
            });
            
    }

    //this snippet of code was to change the button display just in case a logged in user found their way into this route, but it isn't their course
    //however, I think I now have other safeguards in place that will redirect them before they get here. For now, I'm leaving this code, just in case.
    let updateButtons = "";
    if(course.userId === authUser.id){
        updateButtons = <><button className="button" type="submit">Update Course</button><Link className="button button-secondary" to={`/courses/${course.id}`} relative="path">Cancel</Link></>;
    }else{
        updateButtons = <><p className="notice">Listen here, {authUser.firstName}! This course can only be updated by the course owner, {course.owner}!</p><button disabled className="button button-secondary button-disabled">Update Course</button><Link className="button button-secondary" to={`/courses`} relative="path">Ok, sorry...</Link></>;
    }

    console.log("----HERE'S THE MATERIALS ONE MORE TIME!");
    console.log(course.materialsNeeded);


    return(
        <main>
            
            <div className="wrap">
                <h2>Update Course Detail</h2>
                {(errors.length > 0) ? <ErrorDisplay errorList={errors}/> : ""}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name"><input id="courseTitle" name="title" type="text" onInput={onUpdateHandler} value={course.title || ""} /></h4>
                            <p>By {course.owner}</p>

                            <textarea className="textareaUpdate" name="description" onInput={onUpdateHandler} value={course.description || ""}>
                                <Markdown>{course.description}</Markdown>
                            </textarea>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <input id="estimatedTime" name="estimatedTime" onInput={onUpdateHandler} type="text" value={course.estimatedTime || ""}/>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <textarea id="materialsNeeded" name="materialsNeeded" onInput={onUpdateHandler} value={course.materialsNeeded || ""}>
                                <Markdown>{course.materialsNeeded}</Markdown>
                            </textarea>
                        </div>
                    </div>
                    <div className="updateButtonRow">
                        {updateButtons}
                    </div>
                </form>
            </div>
        </main>
    )

}

export default CourseUpdate;