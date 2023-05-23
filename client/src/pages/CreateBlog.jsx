import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import setAuthHeader from '../utils/setAuthHeader'
import axios from 'axios'



function CreateBlog() {

    const navigate = useNavigate()

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
    

    //Set ref for form
    const formRef = useRef(null)

    //State for form fields
    const [titulo, setTitulo] = useState('');
    const [introduccion, setIntroduccion] = useState('');
    const [path, setPath] = useState('');
    const [caption, setCaption] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [contenido, setContenido] = useState([]);


    //Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        //Create form data
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('introduccion', introduccion);
        formData.append('thumbnail', thumbnail);
        formData.append('caption', caption)
        formData.append('path', path);
        

        for (let i = 0; i < contenido.length; i++) {
            formData.append(`contenido[${i}][orden]`, contenido[i].orden);
          }

        for (let i = 0; i < contenido.length; i++) {
            formData.append(`contenido[${i}][subtitulo]`, contenido[i].subtitulo);
        }
        
        for (let i = 0; i < contenido.length; i++) {
            formData.append(`contenido[${i}][parrafos]`, contenido[i].parrafos);
        }




        //Send form data to API
        try {
            const res = await axios.post('/api/admin/create', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });

            navigate('/admin')
        } catch (error) {
        }
    }

    //Handle add content
    const handleAddContent = () => {
        setContenido([...contenido, {orden: contenido.length + 1, subtitulo: '', parrafos: ''}])
    }

    //Handle content change
    const handleContentChange = (e, index) => {
        const {name, value} = e.target
        const list = [...contenido]
        list[index][name] = value
        setContenido(list)
    }

    //Handle remove content
    const handleRemoveContent = (index) => {
        const list = [...contenido]
        list.splice(index, 1)
        setContenido(list)
    }

    //Handle thumbnail change
    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0])
    }   

    const handleCopy = () => {
        const textToCopy = "<br/> <br/>";
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            console.log('Text copied to clipboard');
          })
          .catch((error) => {
            console.error('Failed to copy text:', error);
          });
      };


  return (
    <div>
        <h1 className="text-center text-5xl font-bold mt-5">Crear Blog</h1>  
        <form onSubmit={handleSubmit} className="w-1/2 m-auto" ref={formRef}>
            <div className="my-4 ">
                <label htmlFor="titulo">Titulo</label>
                <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    value={titulo}  
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded "
                />
                <label htmlFor="introduccion">Introduccion</label>
                <textarea
                    name="introduccion"
                    id="introduccion"
                    value={introduccion}
                    onChange={(e) => setIntroduccion(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"   
                />
                <label htmlFor="path">Path</label>
                <input
                    type="text"
                    name="path"
                    id="path"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <label htmlFor="thumbnail">Thumbnail</label>
                <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    onChange={handleThumbnailChange}    
                    className="w-full border border-gray-300 rounded p-0 file:p-2 file:cursor-pointer file:bg-yellow-500 file:text-white file:border-0 "
                />
                <label htmlFor="caption">Caption</label>
                <textarea
                    type="text"
                    name="caption"
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />


                <label htmlFor="contenido" className='mt-4'>Contenido</label>
                
                {contenido.map((item, index) => {
                    return (
                        <div key={index} className='mt-2'>
                            <input
                                type="text"
                                name="subtitulo"
                                placeholder="Subtitulo"
                                value={item.subtitulo}
                                onChange={(e) => handleContentChange(e, index)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <textarea
                                name="parrafos"
                                placeholder="Parrafos"
                                value={item.parrafos}   
                                onChange={(e) => handleContentChange(e, index)}
                                className="w-full p-2 border mt-2 border-gray-300 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveContent(index)}
                                className="bg-red-500 text-white p-2 rounded mt-2"
                            >
                                Eliminar
                            </button>
                        </div>
                    )
                })}
                            <div className='w-full flex flex-wrap justify-between mt-3'>
                            <button 
                                type="button"
                                onClick={handleAddContent}
                                className="bg-green-500 w-1/4 text-white p-2 rounded"
                            >
                                Agregar
                            </button>
                            <button 
                                type="button"
                                onClick={handleCopy}
                                className="bg-yellow-500 w-1/4 text-white p-2 rounded"
                            >
                                Copiar break
                            </button>
                            <button
                            type="submit"
                            className="bg-cyan-500 text-white text-xl p-4 rounded w-1/4 "
                        >
                            Crear
                        </button>
                        </div>
                       
                            </div>
                            
                        </form>
                        


    </div>
  )
}

export default CreateBlog