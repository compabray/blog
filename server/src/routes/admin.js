const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const {initializeApp} = require('firebase/app');
const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require('firebase/storage');
const {apiKey} = require('../firebase/apiKey');
const sharp = require('sharp'); // librería para optimizar la imagen

const app = initializeApp(apiKey);

// Inicializar Firebase Storage
const storage = getStorage(app, "gs://imagenes-blog-b70f6.appspot.com");

// Configurar multer para recibir la imagen del frontend
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});



const Admin = require('../models/admin');
const Blog = require('../models/blog');

const router = express.Router();

//Login admin

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const user = await Admin.findOne({username: username})

    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

    if (password !== user.password) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({username}, 'secret');

    res.json({ message: 'Autenticación exitosa', token });
})

//Verify token

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    const decoded = jwt.verify(token, 'secret');

    req.username = decoded.username;

    next();
}

//Check token

router.post('/checktoken', (req, res) => {
    const token = req.body.token;
    if (!token) {
      return res.status(200).json({ message: 'No autorizado' });
    }
    try {
      jwt.verify(token, 'secret');
      res.status(200).json({ message: 'Token válido', state:true });
    } catch (err) {
      res.status(200).json({ message: 'Token inválido', state:false });
    }
  });

router.post('/create', verifyToken, upload.single('thumbnail'), async (req, res) => {

    const titulo = req.body.titulo;
    const introduccion = req.body.introduccion;
    const caption = req.body.caption;
    const contenido = req.body.contenido;
    const path = req.body.path;
    const thumbnail = req.file;
    
    
    // Optimizar la imagen
    const optimizedImage = await sharp(thumbnail.buffer)
        .toBuffer();
      
    // Subir la imagen a Firebase Storage
    const storageRef = ref(storage, 'blog/' + thumbnail.originalname);

    const metadata = {
        contentType: thumbnail.mimetype
    };

    // Subir la imagen
    const snapshot = await uploadBytesResumable(storageRef, optimizedImage, metadata);

    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);

    const newBlog = new Blog({
        path: path,
        titulo: titulo,
        caption: caption,
        introduccion: introduccion,
        contenido: contenido,
        thumbnail: downloadURL
    });
    
    newBlog.save()
        .then(() => res.json('Blog added!'))
        .catch((err) => res.status(400).json('Error: ' + err)); 
});

//Delete a blog
router.delete('/:id', verifyToken, async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
        .then(() => res.json('Blog deleted.'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', verifyToken, upload.single('thumbnail'), async (req, res) => {
    await Blog.findById(req.params.id)
        .then((blog) => {
            blog.titulo = req.body.titulo;
            blog.introduccion = req.body.introduccion;
            blog.caption = req.body.caption;
            blog.contenido = req.body.contenido;
            blog.path = req.body.path;
            blog.thumbnail = req.file;
            
            blog.save()
                .then(() => res.json('Blog updated!'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});


module.exports = router;