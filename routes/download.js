const express = require('express');
const AnnualReport = require('../models/AnnualReport');
const reportTemplate = require('../templates/reportTemplate');
const puppeteer = require('puppeteer');
const HTMLtoDOCX = require('html-to-docx');
const router = express.Router();

router.get('/download/pdf/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const report = await AnnualReport.findById(id);
    if (!report) return res.status(404).json({ error: 'Report not found' });

    const html = reportTemplate(report.toObject());
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.addStyleTag({ content: '#sidebar { display: none !important; } #content { margin-left: 0 !important; }' });

    const buffer = await page.pdf({ format: 'A3', printBackground: true, margin: { top: '15mm', bottom: '15mm', left: '10mm', right: '10mm' } });
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="annual_report.pdf"'
    });
    res.send(buffer);
  } catch (err) {
    console.error('PDF generation error', err);
    res.status(500).json({ error: 'Failed to generate PDF', details: err.message });
  }
});

router.get('/download/docx/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const report = await AnnualReport.findById(id);
    if (!report) return res.status(404).json({ error: 'Report not found' });

    const htmlString = reportTemplate(report.toObject());
    const buffer = await HTMLtoDOCX(htmlString, null, {
      title: 'SNDT Annual Report',
      margins: { top: 720, bottom: 720, left: 720, right: 720 },
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true
    });

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename="annual_report.docx"'
    });
    res.send(buffer);
  } catch (err) {
    console.error('DOCX generation error', err);
    res.status(500).json({ error: 'Failed to generate DOCX', details: err.message });
  }
});

module.exports = router;
