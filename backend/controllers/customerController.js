const Customer = require("../models/customerModel");
const asyncHandler = require("express-async-handler");

const mongoose = require('mongoose');


const createCustomer = asyncHandler(async (req, res) => {
  console.log('friends');
  const { email, name, phone, gender, preference} = req.body;

  try {
    const customer = await Customer.create({
      name,
      email,
      phone,
      gender,
      preference
    });

    console.log(customer);
    res.status(200).json({ message: `${name} You have been registered Successfully`});
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation errors
      const messages = Object.values(error.errors).map(val => val.message);
      res.status(400).json({ message: messages });
    } else if (error.code === 11000) {
      // Handle duplicate key errors (e.g., duplicate email)
      res.status(400).json({ message: 'Email or Phone Number is already registered' });
    } else {
      // Handle other types of errors
      res.status(500).json({ message: 'Server Error' });
    }
  }
});

  module.exports = {
    createCustomer
  }