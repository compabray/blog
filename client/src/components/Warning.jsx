import { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import setAuthHeader from '../utils/setAuthHeader'
import axios from 'axios'


function Warning({id, title, setSuccess, setId, buttonRef}) {

    const warnRef = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token === null || token === undefined) {
              navigate('/login')
        }
        else if (token){
            setAuthHeader(token)
        }
    }, [])


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (warnRef.current && !warnRef.current.contains(event.target)) {
                if (!event.target.matches('.button')) {
                  setId(null);
                }
              }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);


    const handleDelete = () => {
        axios.delete(`/api/admin/${id}`)
        .then(res => {
            setSuccess(true)
        })
        .catch(err => {
            setSuccess(false)
        })
        setId(null)
    }



  return (
  
            <div  className='fixed right-0 left-0 top-0 bottom-0 flex justify-center bg-gray-900 bg-opacity-95  z-40'>
                <div ref={warnRef} className='w-1/4 h-1/3 rounded m-auto bg-gray-200 p-4 flex justify-center flex-wrap'>
                    <h2 className='w-full text-4xl flex justify-evenly font-bold text-yellow-600'>¡ATENCION!</h2>
                    <p className='text-lg text-center mt-4'>
                        Si borras el post <span className='font-bold'>{title}</span> no podras recuperarlo ya que este se eliminara de manera permanente.

                        <br/>
                        ¿Estas seguro de querer eliminarlo?
                    </p>
                    <button ref={buttonRef} className='button w-1/2 duration-200 border-2 border-red-500 hover:bg-red-500 p-1 rounded-lg text-xl font-bold text-red-600 hover:text-white' onClick={handleDelete}>ELIMINAR</button>
                </div>
            </div>
        ) 
}

export default Warning