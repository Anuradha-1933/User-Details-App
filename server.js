const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDetailsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema and model
const User = mongoose.model('User', new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: {
    type: String,
    match: [/^\d{10}$/, 'Invalid phone number'],
    required: true
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    required: true
  },
  address: String
}));

// Routes
app.post('/submit', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: 'User saved successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
