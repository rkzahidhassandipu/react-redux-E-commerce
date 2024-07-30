import React from 'react';
import "./Header.scss";
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <header className='header text-white'>
        <div className='container'>
            <div className='header-cnt'>
                <div className='header-cnt-top fs-13 py-2 flex align-center justify-between'>
                    <div className='header-cnt-top-l'>
                        <ul className='flex top-links'>
                            <li className='vart-line'>
                                <Link to="/seller">Seller Center</Link>
                            </li>
                            <li className='vart-line'>
                                <Link to="/download">Download</Link>
                            </li>
                            <li className='flex align-center px-2'>
                                <span className='fs-13'>Follow us</span>
                                <ul className='social-links flex align-center'>
                                    <li className='mx-2'>
                                        <a href="#">
                                            <i className='fab fa-facebook'></i>
                                        </a>
                                    </li>
                                    <li className='mx-2'>
                                        <a href="#">
                                            <i className='fab fa-instagram'></i>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className='header-cnt-topr'>
                        <ul className='top-links flex align-center'>
                            <li className='vart-line'>
                                <Link to="" className='top=link-itm'>
                                    <span className='top-link-itm-icon mx-2'>
                                        <i className='fa-solid fa-circle-question'></i>
                                    </span>
                                    <span className='top-link-itm-txt'>Support</span>
                                </Link>
                            </li>
                            <li className='vart-line'>
                                <Link to="/">
                                    <span className='top-link-itm-txt'>Register</span>
                                </Link>
                            </li>
                            <li className='px-2'>
                                <Link to="/">
                                    <span className='top-link-itm-txt'>Log in</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='header-cnt-bottom'>
                    <Navbar />
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header