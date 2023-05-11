import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formDate } from '../utils/formDate'
import { Helmet } from 'react-helmet'


function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/api/')
        .then(res => {
            setData(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

  return (
    <>
    <Helmet>
        <title>Blysphil</title>
        <meta name="description" content="Join the Blysphil community to unlock your inner strengths and explore expert advice on personal growth, productivity, fitness, and more. Start reading now and transform your life!" />
    </Helmet>
    <div className="text-black w-11/12 xl:w-3/4 m-auto">
        <h1 className="text-2xl lg:text-4xl font-bold text-center p-2">Unlock your full potential with <span className='text-yellow-600'>Blysphil</span></h1>
        <h3 className="text-sm text-center mt-3 p-2 lg:text-base md:w-2/3 m-auto text-gray-700 lg:p-4">Join the Blysphil community to unlock your inner strengths and explore expert advice on personal growth, productivity, fitness, and more. Start reading now and transform your life!</h3>
        <div className='flex flex-wrap justify-around mt-2'>
            {data.map((item, index) => {

                                      
            console.log(item._id)
                return (
                    
                    <div className='sm:w-1/2 lg:w-1/3 2xl:w-1/4 my-3 p-4' key={index}>
                        <Link to={`/blog/${item.path}`}>
                        <div className='w-full min-h-[180px] max-h-56 xl:h-48'>
                            <img 
                                className='w-full h-full max-h-56 object-cover border border-gray-300'
                                src={item.thumbnail}     
                                alt={item.titulo}
                            />

                        </div>
                        <h2 className='text-lg md:text-xl py-2 font-bold' key={item.id}>{item.titulo }</h2>
                        </Link>
                        <p className='leading-5 md:mb-3 text-sm'>{item.caption}</p>
                        <span className='text-xs md:text-sm w-full text-left font-semibold text-yellow-600'>{formDate(item.createdAt)}</span>
                    </div>
                    )
                })}

        </div>
    </div>
    </>
  )
}

export default Home