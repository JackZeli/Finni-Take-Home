import { useEffect, useState } from 'react';
import axios from 'axios';
import PatientForm from './PatientForm.jsx'
import SearchBar from './SearchBar.jsx'
import './Patients.css';
import EditPatientModal from './EditPatientModal.jsx';
import { Table, Input, Select } from 'antd';


function Patients() {
  const [patients, setPatients] = useState([]);
  const [staticPatients, setStaticPatients] = useState([]);

  const [filter, setFilter] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/patients')
      .then(res => {
        const patientsWithKey = res.data.map(patient => ({
          ...patient,
          key: patient._id,
        }));
        setPatients(patientsWithKey);
        setStaticPatients(patientsWithKey);
      })
      .catch(err => console.error(err));
    setFilterCategory(null);
  }, [patients]);

  /*const getPatients = () => {
    axios.get('http://localhost:4000/api/patients')
      .then(res => {
        const patientsWithKey = res.data.map(patient => ({
          ...patient,
          key: patient._id,
        }));
        setPatients(patientsWithKey);
        setStaticPatients(patientsWithKey);
      })
      .catch(err => console.error(err));
  }*/


  const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstname',
    key: 'firstname',
    editable: true,
    sorter: (a, b) => a.firstname.localeCompare(b.firstname), //localeCompare compares strings based on current locale rules
  },
  {
    title: 'Middle Name',
    dataIndex: 'middlename',
    key: 'middlename',
    sorter: (a, b) => a.middlename.localeCompare(b.middlename), //localeCompare compares strings based on current locale rules

  },
  {
    title: 'Last Name',
    dataIndex: 'lastname',
    key: 'lastname',
    sorter: (a, b) => a.lastname.localeCompare(b.lastname), //localeCompare compares strings based on current locale rules
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
  {
    title: 'Delete',
    render: (_, record) => <a onClick={() => deletePatient(record)}>Delete</a>
  },
  {
    title: 'Edit',
    render: (_, record) => <a onClick={() => handleToggle(record)}>Edit</a>
  }
];

  const handleFilter = (e) => {
    const curFilter = e.target.value.toLowerCase();
    //Have to use curFilter instead of filter because state updates happen Async
    setFilter(curFilter); //This happens at the end of the run    
    filterPatients(curFilter, filterCategory);
  }

  const filterPatients = (curFilter, curFilterCategory) => {
    if (curFilter === '') setPatients(staticPatients);

    if (curFilterCategory) {
      const filtered = staticPatients.filter((p) => 
        p[curFilterCategory].toString().toLowerCase().includes(curFilter))

      setPatients(filtered);
    }
  }

  const handleFilterCategory = (value) => {
    setFilterCategory(value);
    filterPatients(filter, value); //Similarly have to pass in value here because filterCategory state doesn't update until after run
  }
  
  const handleAddPatients = (newPatient) => {
    setPatients([...patients, { newPatient, key: newPatient._id }]);
  };

 const deletePatient = async (patient) => {
    await axios.delete(`http://localhost:4000/api/patients/${patient._id}`);
    //need to use `` here in order for the string interpolation to work!

    const newPatients = staticPatients.filter((p) =>
      p._id !== patient._id)

    setPatients(newPatients);
    setStaticPatients(newPatients);
  }

  const [toggle, setToggle] = useState(false);
  const [modalPatient, setModalPatient] = useState([]);

  const handleToggle = (patient) => {
    console.log('swag')
    console.log(patient)
    setToggle(prev => !prev);
    setModalPatient(patient);
  }

  return (
    <div className="patients">
  
      <h1>Patient Data Tracking</h1>
            <PatientForm onAdd={handleAddPatients} />

            <SearchBar onType={handleFilter} onSelect={handleFilterCategory} />

            <Table columns={columns} dataSource={patients} />

            <div>
              {toggle ?
              <EditPatientModal Patient={modalPatient} />
              :
              <>
              </>
              }
            </div> 
    </div>
  );
}

export default Patients;