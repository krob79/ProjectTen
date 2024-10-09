
import {useState} from 'react';
import ErrorDisplay from './ErrorDisplay';
import { Link } from 'react-router-dom';
// Import axios to post Request
import axios from "axios";

const UserSignUp = () => {

    const userObj = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: ""
    }
    
    //const {pending} = useFormStatus();
    const [user, setUser] = useState(userObj);
    const [errors, setErrors] = useState([]);

    const clickHandler = () => {
        console.log("CLICK ON BUTTON!");
    }

    const onUpdateHandler = (e) => {
        let objKey = e.target.name;
        console.log(`---updating ${objKey}...`);
        //name attribute in the input fields must match the course property
        const userCopy = {
            ...user
        }
        userCopy[objKey] = e.target.value;

        setUser(userCopy);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        let fetchUrl = `http://localhost:5000/api/users`;

        let formData = JSON.stringify({
            ...user
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
                setErrors(data.message);
                console.log(data)
            })
            //This cataches the error, but the error is that no response has been returned...which is intended from the REST API
            //So...not sure what if anything needs to be changed here, because the creation of the database entry seems to work!
            .catch(error => console.log(`----NO RESPONSE DATA ${error}`));
    }

    return(
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {(errors.length > 0) ? <ErrorDisplay errorList={errors}/> : ""}
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" onInput={onUpdateHandler} value={user.firstName} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" onInput={onUpdateHandler} value={user.lastName} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onInput={onUpdateHandler} value={user.emailAddress} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onInput={onUpdateHandler} value={user.password} />
                    <button className="button" type="submit">Sign Up</button><Link to={`/courses`} className="button button-secondary">Cancel</Link>
                </form>
                <p>Already have a user account? Click here to <Link to={`/signin`} relative="path">sign in</Link>!</p>
            </div>

        </main>
            
    );
};

export default UserSignUp;
