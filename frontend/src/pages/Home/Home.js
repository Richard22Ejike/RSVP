import React, { useState } from "react";
import Countdown from "react-countdown";
import "./Home.scss";
import { useDispatch } from "react-redux";
import { submitForm } from "../../services/formService";
import { UPDATE_FORM_FIELD, RESET_FORM } from "../../redux/features/form/formSlice";
import Loader from "../Loader/loader";
import Modal from "../Loader/model";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    preference: "", // Add preference to formData
  });
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    dispatch(UPDATE_FORM_FIELD({ name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await submitForm(formData);
    try {
      dispatch(RESET_FORM());
      setIsLoading(false);
      setModalMessage(response.message || "Successfully registered!");
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalMessage("");
  };

  const eventDate = new Date("2024-09-18T18:00:00");

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Event has started!</span>;
    } else {
      return (
        <div className="countdown">
          <div className="countdown-item">
            <span className="countdown-time">{days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-time">{hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-time">{minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-time">{seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="home">
      {isLoading && <Loader />}
      {modalMessage && <Modal message={modalMessage} onClose={handleCloseModal} />}
      <div className="hero-wrapper">
        <section className="container hero">
          <div className="hero-text">
            <h2>Free Financial Empowerment</h2>
            <p>
              To foster a dynamic environment for professionals with significant financial influence to connect,
              exchange ideas, and explore opportunities in Business, Investment, Mortgage.
            </p>
            <div className="hero-buttons">
              <Countdown date={eventDate} renderer={renderer} />
            </div>
            <div className="--flex-start">
              <NumberText num="DATE" text="SATURDAY, OCTOBER 18TH, 2024" />
              <NumberText num="VENUE" text="ATLAS HOTEL REGINA" />
              <NumberText num="Time" text="6:00 PM - 9:00 PM" />
            </div>
            <p>Join Us For a Time of Networking, Supper & Music.</p>
          </div>

          <div className="hero-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="preference">Dietary Preference:</label>
                <select
                  id="preference"
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Preference</option>
                  <option value="gluten-free">Gluten Free</option>
                  <option value="dairy-free">Dairy Free</option>
                  <option value="vegan">Vegan</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
              <button type="submit" className="--btn --btn-primary">Submit</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="">{num}</h3>
      <p className="">{text}</p>
    </div>
  );
};

export default Home;
