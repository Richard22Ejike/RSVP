import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./CustomerDetail.scss";

const CustomerForm = ({
  customer,
  customerImage,
  imagePreview,
  notes,
  setNotes,
  handleInputChange,
  handleImageChange,
  saveCustomer,
}) => {
  return (
    <div className="add-customer">
      <Card cardClass={"card"}>
        <form onSubmit={saveCustomer}>
          <Card cardClass={"group"}>
            <label>Customer Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="customer" />
              </div>
            ) : (
              <p>No image set for this customer.</p>
            )}
          </Card>
          <label>Customer Name:</label>
          <input
            type="text"
            placeholder="Customer name"
            name="name"
            value={customer?.name}
            onChange={handleInputChange}
          />

          <label>Customer Email:</label>
          <input
            type="email"
            placeholder="Customer Email"
            name="email"
            value={customer?.email}
            onChange={handleInputChange}
          />

          <label>Customer Phone:</label>
          <input
            type="text"
            placeholder="Customer Phone"
            name="phone"
            value={customer?.phone}
            onChange={handleInputChange}
          />

          <label>Customer Gender:</label>
          <input
            type="text"
            placeholder="Customer Gender"
            name="gender"
            value={customer?.gender}
            onChange={handleInputChange}
          />

          <label>Customer Preference:</label>
          <input
            type="text"
            placeholder="Customer Preference"
            name="preference"
            value={customer?.preference}
            onChange={handleInputChange}
          />

          <label>Notes:</label>
          <ReactQuill
            theme="snow"
            value={notes}
            onChange={setNotes}
            modules={CustomerForm.modules}
            formats={CustomerForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Customer
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

CustomerForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
CustomerForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default CustomerForm;
