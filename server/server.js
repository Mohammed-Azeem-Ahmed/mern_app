const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/messagesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const Message = mongoose.model('Message', { text: String });

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.post('/api/messages', async (req, res) => {
  const newMessage = new Message({ text: req.body.text });
  await newMessage.save();
  res.status(201).json(newMessage);
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
