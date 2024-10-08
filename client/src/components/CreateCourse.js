import React from 'react';
import {useEffect, useState} from 'react';
import BasicList from './BasicList';

const onClick = () => {
    console.log("CLICKING BUTTON!");
}

const CreateCourse = () => {
    return(
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>::marker "Please do this."</li>
                        <li>::marker "Please do that."</li>
                    </ul>
                </div>
                {/* Disable Submit on Enter key */}
                <form onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" />
                            <p>by USER NAME ADDED HERE</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <BasicList />
                        </div>
                        
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={onClick} href="index.html">Cancel</button>
                </form>
            </div>
        </main>


    );
}

export default CreateCourse;