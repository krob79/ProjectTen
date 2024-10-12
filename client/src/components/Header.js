import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';


const Header = () => {

    return(
        <>
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <Link to={'./courses'} relative="path">Courses</Link>
                </h1>
                <Nav />
            </div>
        </header>
        </>

    );

}

export default Header;