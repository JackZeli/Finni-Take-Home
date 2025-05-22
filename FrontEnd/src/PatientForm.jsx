import React, { useEffect, useState } from 'react';
import axios from 'axios';


function PatientForm({ onAdd }) {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    dob: '',
    status: '',
    address: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/api/patients', formData);
    onAdd(res.data);
    setFormData({
      firstname: '',
      middlename: '',
      lastname: '',
      dob: '',
      status: '',
      address: '',
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="middlename"
        value={formData.middlename}
        onChange={handleChange}
        placeholder="Middle Name"
      />
      <input
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        placeholder="Date of Birth"
        type="date"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        placeholder="Status"
      >
        <option value="">--- Status ---</option>
        <option value="Inquiry">Inquiry</option>
        <option value="Onboarding">Onboarding</option>
        <option value="Active">Active</option>
        <option value="Churned">Churned</option>
      </select>
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm