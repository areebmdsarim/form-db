const mongoose = require('mongoose');

const AnnualReportSchema = new mongoose.Schema({
  submittedAt: { type: Date, default: Date.now },
  academicYear: String,
  section1: mongoose.Schema.Types.Mixed,
  section2: mongoose.Schema.Types.Mixed,
  section3: mongoose.Schema.Types.Mixed,
  section4: mongoose.Schema.Types.Mixed,
  section5: mongoose.Schema.Types.Mixed,
  section6: mongoose.Schema.Types.Mixed,
  section7: mongoose.Schema.Types.Mixed,
  section8: mongoose.Schema.Types.Mixed,
  section9: mongoose.Schema.Types.Mixed,
  section10: mongoose.Schema.Types.Mixed
}, { strict: false });

module.exports = mongoose.model('AnnualReport', AnnualReportSchema);
