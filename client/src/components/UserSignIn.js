
import {useState} from 'react';
import ErrorDisplay from './ErrorDisplay';
// Import axios to post Request
import axios from "axios";

const UserSignIn = () => {

    const userObj = {
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
            .catch(error => console.log(`----LOGGING IN....NO RESPONSE DATA ${error}`));
    }

    return(
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                {(errors.length > 0) ? <ErrorDisplay errorList={errors}/> : ""}
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onInput={onUpdateHandler} value={user.emailAddress} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onInput={onUpdateHandler} value={user.password} />
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={clickHandler}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>

        </main>
            
    );
};

export default UserSignIn;
