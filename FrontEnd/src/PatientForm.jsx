import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select } from "antd";
import axios from 'axios';
import dayjs from 'dayjs';
import "./PatientForm.css";

function PatientForm({ onAdd }) {
  const [form] = Form.useForm();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (values) => {

    const submitData = {
      ...values,
      dob: values.dob ? values.dob.format('MM/DD/YYYY') : '',
    }

    const res = await axios.post('http://localhost:4000/api/patients', submitData);
    onAdd(res.data);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="patient-form">
      <Form.Item
        label = "First Name"
        name="firstname"
        rules={[{ required: true, message: "First Name"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label = "Middle Name"
        name="middlename"
        rules={[{ required: true, message: "Middle Name"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label = "Last Name"
        name="lastname"
        rules={[{ required: true, message: "Last Name"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label = "Date of Birth"
        name="dob"
        rules={[{required: true}]}
      >
        <DatePicker 
          format="MM/DD/YYYY"
          allowClear
          inputReadOnly={false}
        />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Last Name"}]}
      >
        <Select placeholder="---- Status ----">
          <Option value="Inquiry">Inquiry</Option>
          <Option value="Onboarding">Onboarding</Option>
          <Option value="Active">Active</Option>
          <Option value="Churned">Churned</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label = "Address"
        name="address"
        rules={[{ required: true, message: "Address"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item className="submit" label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  );
}

export default PatientForm