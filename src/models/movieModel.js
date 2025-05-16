/*
titulo string 
descripcion string
director string
genero string o array Género(s)
anio number
duracion number
imagen string
*/ 

import { Schema, model } from "mongoose";


const movieSchema = new Schema({
    movie: {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    director :  {
        type : String,
        required : true
    },
    genre :  {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    releaseYear : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    imageId : {
        type : String,
        required : true
    }
},
{
    timestamps : true,
    strict : false
});

export default model ("Movies", movieSchema)
