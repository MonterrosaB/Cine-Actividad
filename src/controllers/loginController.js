import employeeModel from "../models/employeeModel.js"
import customerModel from "../models/customerModel.js"

import bcrypt from "bcryptjs";
import jsonweb from "jsonwebtoken";
import {config} from "../config.js"

const loginController = {};

loginController.login = async(req, res) =>{
    const {
        email,
        password
    } = req.body;

    try {
        //validamos los niveles (Paciente, Doctor)
        let userFound;
        let userType;

        const loginAdmin = await employeeModel.findOne({email});

        if (loginAdmin) {
            userFound = loginAdmin
            userType = "admin";
        } else {
            const loginCustomer =await customerModel.findOne({email});  
            if(loginCustomer){
                userFound = loginCustomer
                userType = "customer"

            }
        }
        
        if(!userFound){
            return res.json({message: "User not found"})
        }

        //Validar contraseña
        if(userType){
            const isEqual = await bcrypt.compare(password, userFound.password)
            if(!isEqual){
                return res.json({message: "invalid password or user"})
            }
        }

        //TOKEN
        jsonweb.sign(
            //Que voy a guardar
            {id: userFound._id, userType},
             //Secreto
             config.JWT.SECRET,
             //Cuano expira
             {expiresIn: config.JWT.EXPIRES},
             //Función flecha
             (error, token) =>{
                 if(error) console.log("error en login: "+ error);
                 res.cookie("authToken", token)
                 res.json({message: "Login successful"})
             }
        )


    } catch (error) {
        console.log("error: "+ error);
        res.json({message: "error login"});
    }
}

export default loginController;