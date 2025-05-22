const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  firstname: String,
  middlename: String,
  lastname: String,
  dob: String,
  status: {
    type: String,
    enum: ["Inquiry", "Onboarding", "Active", "Churned"]
  },
  address: String,
});

module.exports = mongoose.model('Patient', PatientSchema);