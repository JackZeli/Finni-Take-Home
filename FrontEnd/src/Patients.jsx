import { useEffect, useState } from 'react';
import axios from 'axios';
import PatientForm from './PatientForm.jsx'
import { Table } from 'antd';

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = () => {
    axios.get('http://localhost:4000/api/patients')
      .then(res => {
        const patientsWithKey = res.data.map(patient => ({
          ...patient,
          key: patient._id,
        }));
        setPatients(patientsWithKey)
      })
      .catch(err => console.error(err));
  }

  const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstname',
    key: 'firstname',
  },
  {
    title: 'Middle Name',
    dataIndex: 'middlename',
    key: 'middlename',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastname',
    key: 'lastname',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dob',
    key: 'dob',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      {
        text: 'Inquiry',
        value: 'Inquiry',
      },
      {
        text: 'Onboarding',
        value: 'Onboarding',
      },
      {
        text: 'Active',
        value: 'Active',
      },
      {
        text: 'Churned',
        value: 'Churned',
      },

    ],
          onFilter: (value, record) => record.status.indexOf(value) === 0,

  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];


  const handleAddPatients = (newPatient) => {
    setPatients([...patients, { newPatient, key: newPatient._id }]);
    getPatients();
  };


  return (
    <div>
      <h1>Patients</h1>
            <PatientForm onAdd={handleAddPatients} />
            <Table columns={columns} dataSource={patients} />
    </div>
  );
}

export default Patients;