import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CustomerForm from "../../components/customer/customerForm/CustomerForm";
import {
  createCustomer,
  selectIsLoading,
} from "../../redux/features/customer/customerSlice";

const initialState = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  preference: "",
};

const AddCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(initialState);
  const [customerImage, setCustomerImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [notes, setNotes] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, email, phone, gender, preference } = customer;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleImageChange = (e) => {
    setCustomerImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveCustomer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("preference", preference);
    formData.append("notes", notes);
    if (customerImage) {
      formData.append("image", customerImage);
    }

    console.log(...formData);

    await dispatch(createCustomer(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Customer</h3>
      <CustomerForm
        customer={customer}
        customerImage={customerImage}
        imagePreview={imagePreview}
        notes={notes}
        setNotes={setNotes}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveCustomer={saveCustomer}
      />
    </div>
  );
};

export default AddCustomer;
