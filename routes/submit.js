const express = require('express');
const AnnualReport = require('../models/AnnualReport');
const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const newReport = new AnnualReport(req.body);
    const saved = await newReport.save();
    res.json(saved);
  } catch (error) {
    console.error('Submit error', error);
    res.status(500).json({ error: 'Failed to save report', details: error.message });
  }
});

router.get('/report/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const report = await AnnualReport.findById(id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (error) {
    console.error('Fetch report error', error);
    res.status(500).json({ error: 'Failed to fetch report', details: error.message });
  }
});

module.exports = router;
