import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

import Helmet from "react-helmet";

import { formDate } from "../utils/formDate";


function SingleBlog() {

    //Get path from URL
    const { path } = useParams();

    const [data, setData] = useState([])
    const [contenido, setContenido] = useState([])
    const [loading, setLoading] = useState(true)

    //Get data from API
    useEffect(() => {
        axios.get(`/api/${path}`)
        .then(res => {
            setData(res.data)
            setContenido(res.data.contenido)

            setTimeout(() => {
                setLoading(false)
            }, 500)

        })
        .catch(err => {
        })
    }, [path])


    return (
        <div>
            <Helmet>
                <title>{`${data.titulo}`} - Blysphil</title>
                <meta name="description" content={data.introduccion} />
            </Helmet>

            {loading ? <Loading/> : <div className="w-full">
            <div className="p-2 sm:w-5/6 lg:w-9/12 m-auto">
            <h1 className="lg:p-6 w-full text-center text-2xl md:text-3xl lg:text-5xl font-bold text-gray-800">{data.titulo}</h1>
            <div className="md:w-2/3 m-auto mt-5 p-4">
            <img 
                className="border border-neutral-300 object-cover"
                src={data.thumbnail}
                alt={data.titulo}
            />  
            <p className="text-xs py-2">
                <span className="text-gray-700">Published on: </span>
                <span className="text-yellow-600">{formDate(data.createdAt)}</span>
            </p>
            <p className="text-gray-800 text-sm  mt-3"  dangerouslySetInnerHTML={{ __html: data.introduccion }}/>
            </div>

            <div>
                <div>
               {contenido.map((item, index) => {
                    return (
                        <div className="p-4 md:w-2/3 m-auto my-2 lg:my-6" key={index}>
                            {
                                item.subtitulo.toLowerCase() === "conclusion" || item.subtitulo.toLowerCase() === "conclusión"  ? 
                                    <h2 className="text-2xl font-semibold mb-3 text-yellow-600">{item.subtitulo}</h2>                               
                                :
                                    <h2 className="text-xl font-semibold mb-3 text-gray-700"> <span className="text-yellow-600">{item.orden}. </span>{item.subtitulo}</h2>
                           }
                            <p className="text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: item.parrafos }} />
                        </div>
                    )
                })} 
                </div>
            </div>
  
        </div>
        <Footer/>
            </div>}
           
        </div>
    )
}

export default SingleBlog;