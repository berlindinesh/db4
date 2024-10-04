const mongoose = require('mongoose');

const ServiceHistorySchema = new mongoose.Schema({
  transactionType: { type: String, required: true },
  office: { type: String, required: true },
  post: { type: String, required: true },
  orderNumber: { type: String },
  orderDate: { type: Date },
  incrementDate: { type: Date },
  payScale: { type: String },
  otherDept: { type: String },
  areaType: { type: String },
});

module.exports = mongoose.model('EmployeeServiceHistory', ServiceHistorySchema);
