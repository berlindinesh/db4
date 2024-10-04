const mongoose = require('mongoose');

const NominationDetailsSchema = new mongoose.Schema({
  nomineeName: { type: String, required: true },
  relation: { type: String, required: true },
  dob: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  guardianName: { type: String },
  sharePercentage: { type: Number, required: true },
});

module.exports = mongoose.model('EmployeeNominationDetails', NominationDetailsSchema);
