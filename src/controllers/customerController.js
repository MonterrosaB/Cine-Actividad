import customerModel from "../models/customerModel.js";

import jsonweb from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config.js";

const customerController = {};

//select
customerController.getCustomer = async (req, res) => {
  const customers = await customerModel.find();
  res.json(customers);
};

//Insert
customerController.createCustomer = async (req, res) => {
  const { name, email, password, phoneNumber, address, dui } = req.body;

  try {
    const customerExist = await customerModel.findOne({ email });

    if (customerExist) {
      return res.json({ message: "Customer already exists." });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const newCustomer = new customerModel({
      name,
      email,
      password: passwordHashed,
      phoneNumber,
      address,
      dui,
    });

    await newCustomer.save();

    jsonweb.sign(
      { id: newCustomer._id },
      config.JWT.SECRET,
      { expiresIn: config.JWT.EXPIRES },
      (error, token) => {
        if (error) console.log("error: " + error);
        res.cookie("authToken", token);
        res.json({ message: "Customer saved" });
      }
    );
  } catch (error) {
    res.json({ message: "error: " + error });
  }
};

//Delete
customerController.deleteCustomer = async (req, res) => {
  await customerModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
};

//Update
customerController.updateCustomer = async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    address,
    dui
  } = req.body;

  const passwordHashed = await bcrypt.hash(password, 10);

  await customerModel.findByIdAndUpdate(
    req.params.id,
    {
        name,
        email,
        password : passwordHashed,
        phoneNumber,
        address,
        dui
    },
    { new: true }
  );

  res.json({ message: "Customer Updated" });
};

export default customerController;
