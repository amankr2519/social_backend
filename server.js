require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

const userRoutes = require('./routes/useRoutes');

app.use('/api/user',userRoutes);

app.get('/', (req, res) => {
  res.send('API running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
