"use client";

import React, { useState, useEffect } from "react";
import db from "../.././firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "../globals.css";
import Image from "next/image";
import ImageTeam from "@/public/assets/arch/team-work.png";
import WhatsappChatIcon from "@/components/whatsapp";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    email_id: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [responseMessage, setResponseMessage] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  // useEffect(() => {
  //   validateForm();
  // }, [formData.name, formData.mobile_no, formData.email_id, formData.message]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDoc().then((data) => setUsers(data));
  }, []);

  const handleChange = (e) => {
    validateForm();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.mobile_no]: e.target.value,
      [e.target.email_id]: e.target.value,
      [e.target.message]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name) {
      errors.name = "Name is required.";
    }

    var mobilePattern = RegExp(/^[0-9\b\+\-\(\)]+$/);
    if (!formData.mobile_no) {
      errors.mobileNo = "Mobile number is required.";
    } else if (!mobilePattern.test(formData.mobile_no)) {
      errors.mobileNo = "Mobile number is invalid.";
    }

    var emailPattern = RegExp(/\S+@\S+\.\S+/);
    if (!formData.email_id) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email_id)) {
      errors.email = "Email is invalid.";
    }

    setErrors(errors);

    setIsFormValid(Object.keys(errors).length === 0);
  };

  const addDocument = async (e) => {
    validateForm();
    e.preventDefault();

    try {
      if (isFormValid) {
        const docRef = await addDoc(collection(db, "design_studio_data"), {
          name: formData.name,
          mobile_no: formData.mobile_no,
          email_id: formData.email_id,
          message: formData.message,
        });
        setFormData({
          name: "",
          mobile_no: "",
          email_id: "",
          message: "",
        });
        setResponseMessage("Email sent successfully");
      } else {
        setResponseMessage("Please fill required fields.");
      }
    } catch (e) {
      setResponseMessage("Something went wrong");
    }
  };

  const getDoc = async () => {
    const collectionRef = collection(db, "design_studio_data");
   
    const querySnapshot = await getDocs(collectionRef);
    
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
   
    return data;
  };

  return (
    <section className="bg-black mt-20 py-12 relative">
      <div className="container mb-6 mt-10 mx-auto px-4">
        <div className="grid grid-cols-1 text-white gap-8 items-center md:grid-cols-2">
          <div>
            <form className="max-w-md" onSubmit={addDocument}>
              <div className="mb-4">
                <div className="block font-sans1 font-semibold mb-2">
                  Name *
                </div>
                <input
                  onKeyDown={(event) => {}}
                  type="text"
                  name="name"
                  className="bg-transparent border-b border-gray-500 w-full focus:border-yellow-500 focus:outline-none font-sans1 px-0 py-2"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p style={styles.error}>{errors.name}</p>}
              </div>

              <div className="mb-4">
                <div className="block font-sans1 font-semibold mb-2">
                  Mobile Number *
                </div>
                <input
                  onKeyDown={(event) => {
                    if (isNaN(event.key) && event.key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                  type="tel"
                  name="mobile_no"
                  className="bg-transparent border-b border-gray-500 w-full focus:border-yellow-500 focus:outline-none font-sans1 px-0 py-2"
                  placeholder="Enter your mobile number"
                  value={formData.mobile_no}
                  onChange={handleChange}
                />
                {errors.mobileNo && (
                  <p style={styles.error}>{errors.mobileNo}</p>
                )}
              </div>

              <div className="mb-4">
                <div className="block font-sans1 font-semibold mb-2">
                  Email *
                </div>
                <input
                  type="email"
                  name="email_id"
                  className="bg-transparent border-b border-gray-500 w-full focus:border-yellow-500 focus:outline-none font-sans1 px-0 py-2"
                  placeholder="Enter your email id"
                  value={formData.email_id}
                  onChange={handleChange}
                />
                {errors.email && <p style={styles.error}>{errors.email}</p>}
              </div>

              <div className="mb-4">
                <div className="block font-sans1 font-semibold mb-2">
                  Message
                </div>
                <input
                  type="text"
                  name="message"
                  className="bg-transparent border-b border-gray-500 w-full focus:border-yellow-500 focus:outline-none font-sans1 px-0 py-2"
                  placeholder="Enter your query or message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="bg-white text-gray-900 focus:outline-none hover:bg-gray-500 hover:text-white mt-4 px-4 py-2 transition-colors"
              >
                Send
              </button>
              {/* <p className="text-xs font-sans1 mt-4">By clicking on the "Send" button, I agree to the terms of the privacy policy.</p> */}
              {responseMessage && (
                <p className="text-sm font-sans1 mt-4">{responseMessage}</p>
              )}
            </form>
            {/* <div className="mt-8">
              <p className="font-sans1 font-semibold">Surat</p>
              <p className='font-sans1'>+91 0123456789</p>
              <p className='font-sans1'>test@gmail.com</p>
              <p className='font-sans1'>test-00001, test address, surat-00000,
              </p>
            </div> */}
          </div>
          {/* <div className="flex h-full justify-center w-full md:justify-end relative">
            <Image src={ImageTeam} alt="Teamwork" layout="responsive" objectFit="cover" />
          </div> */}
        </div>
      </div>
      {/* Golden Line */}
      {/* <div className="border-t border-white h-0.5 absolute bottom-0 left-0 right-0"></div>
      <WhatsappChatIcon/> */}

      {/* data get from firebase */}
      {/* <div className="table-responsive">
        <table className="table" style={styles.tableStyle}>
          <thead>
            <tr>
              <th style={styles.tableheaderstyle}>Name</th>
              <th style={styles.tableheaderstyle}>Mobile Number</th>
              <th style={styles.tableheaderstyle}>Email Id</th>
              <th style={styles.tableheaderstyle}>Message</th>
            </tr>
          </thead>
          {users.map(
            (user) => (
              console.log("userss", user),
              (
                <tbody>
                  <tr>
                    <td key={user.id} style={styles.tablecontentstyle}>
                      {user.name}
                    </td>
                    <td key={user.id} style={styles.tablecontentstyle}>
                      {user.mobile_no}
                    </td>
                    <td key={user.id} style={styles.tablecontentstyle}>
                      {user.email_id}
                    </td>
                    <td key={user.id} style={styles.tablecontentstyle}>
                      {user.message}
                    </td>
                  </tr>
                </tbody>
              )
              // (<th key={user.id} style={styles.error}> Mobile Number : {user.mobile_no}</th>)
              // (<th key={user.id} style={styles.error}> Email Id : {user.email}</th>)
              // (<th key={user.id} style={styles.error}> Message : {user.message}</th>)
              // (<li key={user} style={styles.error}>Mobile Number : {user.mobile_no}</li>)
              // (<li key={user} style={styles.error}>Email Id : {user.email}</li>)
              // (<li key={user} >Message : {user.message}</li>)
            )
          )}
        </table>
      </div> */}


    </section>
  );
};

const styles = {
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "6px",
  },

  tableheaderstyle: {
    color: "white",
    fontSize: "14px",
    padding: "6px",
    textAlign: "center",
    border: "1px solid white",
  },

  tablecontentstyle: {
    color: "grey",
    fontSize: "16px",
    padding: "6px",
    textAlign: "center",
    border: "1px solid white",
  },

  tableStyle: {
    margin: "auto",
  },
};

export default Contact;
