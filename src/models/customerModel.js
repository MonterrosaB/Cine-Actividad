/*
nombre string
correo string
Contrasenia String
telefono string
direccion string
DUI 
*/ 

import { Schema, model } from "mongoose";


const customerSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password :  {
        type : String,
        required : true
    },
    phoneNumber :  {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true
    },
    dui : {
        type : String,
        required : true
    }
},
{
    timestamps : true,
    strict : false
});

export default model ("Customers", customerSchema)
