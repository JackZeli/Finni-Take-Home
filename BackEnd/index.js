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
