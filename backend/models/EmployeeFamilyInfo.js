const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  dob: { type: Date, required: true },
  dependent: { type: String, required: true },
  employed: { type: String, required: true },
  sameDept: { type: String },
  empCode: { type: String },
  department: { type: String },
  eSalaryCode: { type: String },
});

module.exports = mongoose.model('EmployeeFamilyInfo', FamilyMemberSchema);
