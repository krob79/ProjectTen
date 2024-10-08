import React from 'react';
import {useEffect, useState} from 'react';
import BasicList from './BasicList';

const UpdateCourseTest = ({course, onUpdate}) => {

    const onUpdateHandler = (e) => {
        console.log(`---UPDATING: ${e.target.value}`);
    }

    return(
        <>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" href="index.html">Return to List</a>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Update Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name"><input id="courseTitle" name="courseTitle" type="text" onChange={onUpdateHandler} value={course.title || ""} /></h4>
                            <p>By {course.owner}</p>

                            <textarea onChange={onUpdateHandler} value={course.description || ""}></textarea>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <input id="estimatedTime" name="estimatedTime" onChange={onUpdateHandler} type="text" value={course.estimatedTime || ""}/>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <BasicList list={materials} onUpdate={onUpdate}/>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )



}

export default UpdateCourseTest;