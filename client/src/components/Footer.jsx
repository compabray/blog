import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePinterest } from '@fortawesome/free-brands-svg-icons'


function Footer() {
  return (
    <footer className="w-full bg-gray-900 mt-24 flex flex-wrap flex-col-reverse md:flex-row">
        <div className="flex flex-col items-center justify-center md:w-1/2 m-auto h-32 bottom-0">
            <p className="text-white">© 2023 - All rights reserved</p>
        </div>
        <div className='w-full mt-5 md:w-1/3 m-auto flex flex-wrap flex-col'>
          <h4 className='h-full text-lg text-gray-300 text-center'>Take a look to our social media!</h4>
          
          <div className="flex flex-row items-center justify-center mt-5">
            <a  target="_blank"  href="https://www.pinterest.com/blysphil/">
            <FontAwesomeIcon icon={faSquarePinterest} className='text-3xl text-yellow-600 hover:text-yellow-500 duration-200'/>
            </a> 
            </div>
            

        </div>
    </footer>

  )
}

export default Footer