/*
nombre string
correo string
contrasenia String
telefono string 
direccion string 
puesto string Cargo o rol (ej. "vendedor", "gerente", etc.)
fecha_contratacion Date 
salario number
DUI
*/ 

import { Schema, model } from "mongoose";


const employeeSchema = new Schema({
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
    rol : {
        type : String,
        required : true
    },
    hiringDate : {
        type : Date,
        required : true
    },
    salary : {
        type : Number,
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

export default model ("Employees", employeeSchema)
