# SNDT Annual Report Full-Stack

This project adds backend + PDF/DOCX export for the existing annual report HTML form.

## Project structure

- `server.js` — Express server
- `models/AnnualReport.js` — Mongoose schema
- `routes/submit.js` — form submit and fetch routes
- `routes/download.js` — PDF/DOCX export routes
- `templates/reportTemplate.js` — HTML template for export
- `public/p1.html` — frontend form + submit/download integration

## Setup

1. Install dependencies:

```bash
cd /Users/areeb/Documents/form-db
npm install
```

2. Start MongoDB locally (example):

```bash
mkdir -p /tmp/mongo-db
mongod --dbpath /tmp/mongo-db --bind_ip 127.0.0.1 --port 27017
```

3. Start the server:

```bash
cd /Users/areeb/Documents/form-db
node server.js
```

4. Open frontend:

- `http://localhost:5050`

## Run + test endpoints

- `POST /api/submit` → save report
- `GET /api/report/:id` → fetch report
- `GET /api/download/pdf/:id` → generate PDF
- `GET /api/download/docx/:id` → generate DOCX

## Quick test

1. Open the page.
2. Fill fields and click ** SUBMIT FULL ANNUAL REPORT**.
3. After success, click **Download as PDF** / **Download as Word**.
4. Use `curl` to verify API:

```bash
curl -X POST http://localhost:5050/api/submit -H 'Content-Type: application/json' -d '{"academicYear":"2025-26","section1":{"institutionName":"SNDT"}}'
```