// import './navbar.css';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import image2 from '../../images/Logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';  

// const Navbar = () => {

    
//     return (
//         <div className='nav'>
//             <div className='nav__logo'>
//                 <Link to =""> <img src={image2} alt="Logo" /></Link>
//                 <p>Department learning Portal</p>
//             </div>
//             <ul className="nav-menu">
//                 <li>Home</li>
//                 <li>About</li>
//                 <li>Services</li>
//                 <li>Contact</li>
//                 <li>
//                     <Link to="/login">
//                         <FontAwesomeIcon icon={faUser} /> {/* Use the imported icon */}
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// }

// export default Navbar;

import './navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image2 from '../../images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='nav1'>
            <div className='nav__logo'>
                <Link to =""> <img src={image2} alt="Logo" /></Link>
                <p>Department Learning Portal</p>
            </div>
            <button className="menu-button" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
            <ul className={`nav-menu ${isMenuOpen ? 'nav-menu--open' : ''}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li>
                    <Link to="/login">
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
// import './navbar.css';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import image2 from '../../images/Logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     return (
//         <div className='nav1'>
//             <div className='nav__logo'>
//                 <Link to="/"><img src={image2} alt="Logo" /></Link>
//                 <p>Department Learning Portal</p>
//             </div>
//             <button className="menu-button" onClick={toggleMenu}>
//                 <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
//             </button>
//             <ul className={`nav-menu ${isMenuOpen ? 'nav-menu--open' : ''}`}>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/about">About</Link></li>
//                 <li><Link to="/services">Services</Link></li>
//                 <li><Link to="/contact">Contact</Link></li>
//                 <li>
//                     <Link to="/login">
//                         <FontAwesomeIcon icon={faUser} />
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Navbar;
