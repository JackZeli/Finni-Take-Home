import './EditPatientModal.css'
import { Form, Input, Button, DatePicker, Select } from "antd";
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';



function EditPatientModal({ Patient, onSubmit }) {

	const [form] = Form.useForm();

	const handleSubmit = async (values) => {
		console.log(Patient._id)
		const submitData = {
	      ...values,
	      dob: values.dob ? values.dob.format('MM/DD/YYYY') : '',
	    }

	    const res = await axios.post(`http://localhost:4000/api/patients/${Patient._id}`, submitData);

	    onSubmit()
	}

	useEffect(() => {
	    if (Patient) {
	      form.setFieldsValue({
	        firstname: Patient.firstname,
	        middlename: Patient.middlename,
	        lastname: Patient.lastname,
	        dob: Patient.dob ? dayjs(Patient.dob) : null, // DatePicker requires dayjs object
	        status: Patient.status,
	        address: Patient.address,
	      });
	    }
	  }, [Patient]);



	return(
		<div className="modalParent">
			<div className="editModal">
				<Form form={form} onFinish={handleSubmit} className="modal">
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
			      	<Button type="primary" className="cancel" htmlType="submit">
			          Cancel
			        </Button>
			        <Button type="primary" htmlType="submit">
			          Submit
			        </Button>
			      </Form.Item>

			    </Form>
			</div>
		</div>
	)

}

export default EditPatientModal;