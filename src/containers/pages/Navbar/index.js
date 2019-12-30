import React from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <div className="custom-navbar">
            <a href="/" className="brand navbar-brand mr-2 text-bold">labeli</a>
        </div>
        
    )    
}

export default Navbar;