const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const submitRoutes = require('./routes/submit');
const downloadRoutes = require('./routes/download');

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.use('/api', submitRoutes);
app.use('/api', downloadRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'p1.html'));
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sndtAnnualReports';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
