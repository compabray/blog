import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import setAuthHeader from '../utils/setAuthHeader'
import { useNavigate } from "react-router-dom"
import { formDate } from '../utils/formDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPencil } from '@fortawesome/free-solid-svg-icons'
import Warning from '../components/Warning'

function Admin() {

    const [id, setId] = useState('')
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState([])

    const navigate = useNavigate()
    const buttonRef = useRef()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token === null || token === undefined) {
           navigate('/login')
        }
        else if (token){
    
            const checkToken = async () => {
           const res = await axios.post('/api/admin/checktoken',
           {
            token: token
           })

           if(res.data.state === false) {
               navigate('/login')
            } else if (res.data.state === true) {
                setAuthHeader(token)
            }
        }
        checkToken()

        }
    }, [])

    
    useEffect(() => {
        axios.get('/api/')
        .then(res => {
            setData(res.data)
        })
        .catch(err => {
        })
    }, [buttonRef, success ])

    const handleShow = (id) => {
        setId((prevId) => (prevId === id ? null : id));
    }


  return (
    <div>
        <h1 className='text-5xl text-center font-bold text-gray-900'>ADMIN</h1>
        <div className='flex w-10/12 m-auto flex-wrap justify-between'>
            {data.map((item, index) => {
                return (

                    <div className='w-1/4 m-2' key={index}>
                         {
                            id === item._id  && <Warning id={item._id} title={item.titulo} setSuccess={setSuccess} setId={setId} buttonRef={buttonRef}/> 
                        }
                    <div className='w-full h-64 relative'>
                        <FontAwesomeIcon icon={faClose} className='absolute top-0 right-0 p-2 text-gray-50 w-10 rounded h-6 bg-red-600 cursor-pointer button' onClick={()=> {
                            handleShow(item._id)
                        }}/>
                        <FontAwesomeIcon icon={faPencil} className='absolute top-0 p-2 text-gray-50 w-10 rounded h-6 bg-yellow-600 cursor-pointer'  />
                        <img 
                            className='w-full h-full object-cover border rounded border-gray-300'
                            src={item.thumbnail}     
                            alt={item.titulo}
                        />

                    </div>
                    <h2 className='text-xl py-2 font-bold' key={item.id}>{item.titulo }</h2>
                    <p className='leading-5 mb-3 text-sm'>{item.caption}</p>
                    <span className='text-sm w-full text-left font-semibold text-yellow-600'>{formDate(item.createdAt)}</span>
                </div>
                )
            })}
        </div>

    </div>
  )
}

export default Admin