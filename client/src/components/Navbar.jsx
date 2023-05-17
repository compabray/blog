import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import logo from "../assets/logo_blog.png"

function Navbar() {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

  return (
    <header>
        <nav className="fixed bg-gray-50 top-0 w-full flex justify-between items-center h-16 border border-transparent border-b-gray-200 text-black shadow-sm font-mono" role="navigation">
            <Link to="/" className='flex align-middle'>
                <img src={logo} alt='logo' className='h-7 lg:h-8 ml-5'/>
                <h2 className='text-xl lg:text-2xl text-yellow-600 font-semibold h-full ml-3 tracking-wider'>BLYSPHIL</h2>
            </Link> 
            
            <div className="px-4 cursor-pointer absolute top-4 right-4 z-40 text-yellow-600 text-2xl md:hidden" onClick={handleClick}>
                {click ? <FontAwesomeIcon icon={faTimes}/> : <FontAwesomeIcon icon={faBars}/>}
            </div>
            <div className={`flex flex-col absolute top-0 right-0 left-0 h-screen bg-items-center justify-center text-center bg-gray-50 text-xl md:hidden ${click ? 'nav' : 'navB'}`}>
                <a href="/" className="p-4 hover:text-yellow-600 duration-200">Home</a>
                <a href="/about" className="p-4 hover:text-yellow-600 duration-200">About</a>
                <a href="/" className="p-4 hover:text-yellow-600 duration-200">Contact</a>
            </div>
            <div className="pr-8 md:block hidden">
                <a href="/" className="p-4 hover:text-yellow-600 duration-200">Home</a>
                <a href="/about" className="p-4 hover:text-yellow-600 duration-200">About</a>
                <a href="/" className="p-4 hover:text-yellow-600 duration-200">Contact</a>
            </div>
        </nav>
    </header>
  )
}

export default Navbar;