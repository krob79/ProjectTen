import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {

    return(
        <>
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <Link to={'./courses'} relative="path">Courses</Link>
                </h1>
                <nav>
                    <ul className="header--signedout">
                        <li><Link to={'/signup'} relative="path">Sign Up</Link></li>
                        <li><Link to={'/signin'} relative="path">Sign In</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
        </>

    );

}

export default Header;