const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    thumbnail: {
      type: String,
      required: true
  },
    introduccion: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required:true,
        default: Date.now
      },
    path: { 
        type: String,
        required: true,
        unique: true
    },
    contenido: {
        type: [{
          orden: {
            type: Number,
            required: true
          },
          subtitulo: {
            type: String,
            required: true
          },
          parrafos: [String]
        }],
        validate: {
          validator: function(v) {
            return Array.isArray(v) && v.length > 0;
          },
          message: 'Debe haber al menos un contenido'
        },
        required: true
      }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;