const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('✅ Connected to MongoDB'))
	.catch(err => console.error('❌ MongoDB connection error:', err));


const Patient = require('./models/Patient');

app.get('/api/patients', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

app.post('/api/patients', async (req, res) => {
  const {firstname, middlename, lastname, dob, status, address} = req.body;
  const newPatient = new Patient({firstname, middlename, lastname, dob, status, address});
  await newPatient.save();
  res.status(201).json(newPatient);
})


app.delete('/api/patients/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting patient' });
  }
});