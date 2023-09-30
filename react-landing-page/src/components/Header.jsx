import React from 'react';
import '../styles/Header.css'
import { Link } from "react-router-dom";
import logo from '../assets/prompttales-logo-removebg-preview.png';
// import Search from './Search';
// import { Button } from "@material-tailwind/react";

const Header = () => {
    return (
        <div className='header-main bg-red w-50'>
            <div className="flex flex-col bg-red w-50">
                <div className="md:border-b  bg-red w-50">
                    <div className="container mx-auto w-50 bg-red">
                        <div className="flex justify-between align-item-center py-2 px-4 w-50 gap-2 bg-red">
                            {/* <Link to="/" className='logo'><img className="ml-2" src={logo} alt="Logo" /></Link> */}
                            <nav className='px-2'>
                            <Link to='/login'><button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Log In</button></Link>
                            <Link to='/signup'><button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded"> Sign Up</button></Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header