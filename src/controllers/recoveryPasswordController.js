import jsonweb from "jsonwebtoken";
import bycrypt from "bcryptjs"

import customerModel from "../models/customerModel.js";
import employeeModel from "../models/employeeModel.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";

const passwordRecoveryController = {}

passwordRecoveryController.requestCode = async (req, res) => {
    const {email} = req.body;

    try {
        let userFound;
        let userType;

        userFound = await customerModel.findOne({email});

        if(userFound){
            userType = "customer";
        }else{
            userFound = await employeeModel.findOne({email})
            if(userFound){
                userType = "admin";                          
            }
        }

        if(!userFound){
            res.json({message : "user not found"})
        }       

        const code = Math.floor(10000 + Math.random()*90000).toString()

        const tokenCode = jsonweb.sign(
            {email, code, userType, verified : false},
            config.JWT.SECRET,
            {expiresIn : "20m"}
        )
        res.cookie("tokenRecoveryCode", tokenCode, {maxAge : 20*60*1000})

        await sendEmail(
            email,
            "Your verification code",
            "Hello! Dont share this code.",
            HTMLRecoveryEmail(code)
        )
        res.json({message : "Codigo de recuperación enviado"})

    } catch (error) {
        console.log(error);
    }
};

//Función para verificar codigo

passwordRecoveryController.verifyCode = async (req, res) => {
    const { code } = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;
        
        //extraer la informaci1ón del token
        const decode = jsonweb.verify(token, config.JWT.SECRET)

        if(decode.code !== code){
            return res.json({message : "invalid code"})
        }

        const newToken = jsonweb.sign(
            {
                email : decode.email,
                code : decode.code,
                userType : decode.userType,
                verified : true
            },
            config.JWT.SECRET,
            {expiresIn : "20m"}
        )
        res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });
        res.json({ message: "Code Verified succesfully" });
    } catch (error) {
        console.log("Error: " + error);
    }
}

//Funciòn para asignar la nueva contraseña

passwordRecoveryController.newPassword = async (req, res) => {
    const { newPassword } = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;

        const decode = jsonweb.verify(token, config.JWT.SECRET)

        if(!decode){
            return res.json({message : "Code not verified"})
        }

        const {email, userType} = decode;

        const hashedPassword = await bycrypt.hash(newPassword, 10)
        let updatedUser

        if(userType === "customer"){
            updatedUser = await customerModel.findOneAndUpdate(
                {email},
                {password : hashedPassword},
                {new : true}
            )
        }else if(userType === "admin"){
            updatedUser = await employeeModel.findOneAndUpdate(
                {email},
                {password : hashedPassword},
                {new : true}
            )
        }

        res.clearCookie("tokenRecoveryCode");

        res.json({message : "Password Updated"})
    } catch (error) {
        console.log("Error" + error);
        
    }
}

export default passwordRecoveryController;  