const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database or database connection logic can be integrated here
const projectsData = [
  {
    id: 1,
    title: "BIONANA",
    category: "IoT & Sustainable Agri-Tech",
    description: "Automated hardware processing system turning banana pseudostem waste into organic liquid fertilizer with statistical NPK validation."
  },
  {
    id: 2,
    title: "T-SIS DBMS",
    category: "Database Management",
    description: "Comprehensive relational database architecture with relational schemas, optimized transactional queries, and data constraints."
  }
];

// API Routes
app.get('/api/projects', (req, res) => {
  res.json(projectsData);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Received message from ${name} (${email}): ${message}`);
  
  // Here you can insert standard query execution to store in a database:
  // db.query('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message])
  
  res.status(200).json({ success: true, message: "Data received safely" });
});

app.listen(PORT, () => {
  console.log(`Backend server running smoothly on port ${PORT}`);
});