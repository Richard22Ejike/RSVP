const Customer = require("../models/customerModel");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');

// Create a new customer
const createCustomer = asyncHandler(async (req, res) => {
  const { email, name, phone, gender, preference } = req.body;

  try {
    const customer = await Customer.create({
      name,
      email,
      phone,
      gender,
      preference
    });

    res.status(200).json({ message: `${name} You have been registered Successfully` });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(val => val.message);
      res.status(400).json({ message: messages });
    } else if (error.code === 11000) {
      res.status(400).json({ message: 'Email or Phone Number is already registered' });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
});

// Get all customers
const getCustomers = asyncHandler(async (req, res) => {
  try {
    const customers = await Customer.find().sort("-createdAt");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single customer by ID
const getCustomerById = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
    } else {
      res.status(200).json(customer);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a customer by ID
const updateCustomer = asyncHandler(async (req, res) => {
  const { email, name, phone, gender, preference } = req.body;

  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
    } else {
      customer.name = name || customer.name;
      customer.email = email || customer.email;
      customer.phone = phone || customer.phone;
      customer.gender = gender || customer.gender;
      customer.preference = preference || customer.preference;

      const updatedCustomer = await customer.save();
      res.status(200).json(updatedCustomer);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a customer by ID
const deleteCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
    } else {
      await customer.remove();
      res.status(200).json({ message: 'Customer removed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
};
