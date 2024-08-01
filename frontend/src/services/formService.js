import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = 'http://localhost:5000';
// process.env.REACT_APP_BACKEND_URL;

// Submit Form
export const submitForm = async (formData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/customer/form/submit`, formData);
    console.log(`${BACKEND_URL}/api/customer/form/submit`);
    if (response.statusText === "OK") {
      toast.success("Form submitted successfully");
    }
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('error');
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    console.log(message);
    
  }
};
