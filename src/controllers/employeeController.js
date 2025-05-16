import employeeModel from "../models/employeeModel.js"

import jsonweb from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config.js";

const employeeController = {};

//select
employeeController.getEmployees = async (req, res) => {
    const employees = await employeeModel.find();
    res.json(employees)
}

//Insert
employeeController.createEmployee = async (req, res) => {
    const {
        name,
        email,
        password,
        phoneNumber,
        address,
        rol,
        hiringDate,
        salary,
        dui
    } = req.body;

    try {
        const employeeExist = await employeeModel.findOne({ email })

        if (employeeExist) {
            return res.json({ message: "Employee already exists." })
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const newEmployee = new employeeModel({
            name,
            email,
            password : passwordHashed,
            phoneNumber,
            address,
            rol,
            hiringDate,
            salary,
            dui
        })

        await newEmployee.save()

        jsonweb.sign(
            { id: newEmployee._id },
            config.JWT.SECRET,
            { expiresIn: config.JWT.EXPIRES },
            (error, token) => {
                if (error) console.log("error: " + error);
                res.cookie("authToken", token);
                res.json({ message: "Employee saved" })

            }
        )

    } catch (error) {
        res.json({ message: "error: " + error })
    }
}

//Delete
employeeController.deleteEmployee = async (req, res) => {
    await employeeModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Employee deleted" })
}

//Update
employeeController.updateEmployee = async (req, res) => {
    const { 
        name,
        email,
        password,
        phoneNumber,
        address,
        rol,
        hiringDate,
        salary,
        dui
     } = req.body;

     const passwordHashed = await bcrypt.hash(password, 10);

    await employeeModel.findByIdAndUpdate(req.params.id, {
        name,
        email,
        password : passwordHashed,
        phoneNumber,
        address,
        rol,
        hiringDate,
        salary,
        dui
    } , {new : true});

    res.json({message : "Employee Updated"}) 
}

export default employeeController;