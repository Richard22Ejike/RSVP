const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid emaial",
      ],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      minLength: [6, "Password must be up to 6 characters"],
     
    },
    gender: {
      type: String,
      default: "",
    },
    preference: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;