require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

// users route
const userRoutes = require('./routes/userRoutes');
app.use('/api/users',userRoutes);


// post route
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts',postRoutes);


app.get('/', (req, res) => {
  res.send('API running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
