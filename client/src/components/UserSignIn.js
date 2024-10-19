
import {useState, useRef, useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import ErrorDisplay from './ErrorDisplay';
import UserContext from '../context/UserContext';

const UserSignIn = () => {

    const {actions} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    // State
    const username = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let from = '/';
        if(location.state){
          from = location.state.from;
        }
    
        const credentials = {
          username: username.current.value,
          password: password.current.value
        };
    
        try {
          //Get user from UserContext
          const user = await actions.signIn(credentials);
          if(user){
            console.log("---navigate to wherever 'from' is...");
            navigate(from);
          }else{
            setErrors(["Sign-in was unsuccessful"]);
          }
        } catch (error) {
          setErrors(error);
          console.log(error);
          
        }
    }
    
    // const handleCancel = (event) => {
    //     event.preventDefault();
    //     navigate("/");
    // }

    return(
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                {(errors.length > 0) ? <ErrorDisplay errorList={errors}/> : ""}
                
                <form onSubmit={handleSubmit}>
                    <input
                    id="username"
                    name="username"
                    type="text"
                    ref={username}
                    placeholder="User Name" />
                    <input
                    id="password"
                    name="password"
                    type="password"
                    ref={password}
                    placeholder="Password" />
                    <div className="pad-bottom">
                    {/* <button className="button" type="submit" style={{ background: accentColor }}>Sign in</button>
                    <button className="button button-secondary" style={{ color: accentColor }} onClick={handleCancel}>Cancel</button> */}
                    <button className="button" type="submit" >Sign in</button>
                    <Link to={`/courses`} className="button button-secondary">Cancel</Link>
                    </div>
                </form>
                <p>Don't have a user account? Click here to <Link to={`/signup`} relative="path">sign up</Link>!</p>
            </div>

        </main>
            
    );
};

export default UserSignIn;
