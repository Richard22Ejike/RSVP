import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CustomerForm from "../../components/customer/customerForm/CustomerForm";
import {
  getCustomer,
  getCustomers,
  selectIsLoading,
  selectCustomer,
  updateCustomer,
} from "../../redux/features/customer/customerSlice";

const EditCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const customerEdit = useSelector(selectCustomer);

  const [customer, setCustomer] = useState(customerEdit);
  const [customerImage, setCustomerImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(getCustomer(id));
  }, [dispatch, id]);

  useEffect(() => {
    setCustomer(customerEdit);

    setImagePreview(
      customerEdit && customerEdit.image ? `${customerEdit.image.filePath}` : null
    );

    setNotes(
      customerEdit && customerEdit.notes ? customerEdit.notes : ""
    );
  }, [customerEdit]);

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
    formData.append("name", customer?.name);
    formData.append("email", customer?.email);
    formData.append("phone", customer?.phone);
    formData.append("gender", customer?.gender);
    formData.append("preference", customer?.preference);
    formData.append("notes", notes);
    if (customerImage) {
      formData.append("image", customerImage);
    }

    console.log(...formData);

    await dispatch(updateCustomer({ id, formData }));
    await dispatch(getCustomers());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Customer</h3>
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

export default EditCustomer;
