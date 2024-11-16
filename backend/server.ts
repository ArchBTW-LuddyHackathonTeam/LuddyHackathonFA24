import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for all routes
app.use(cors());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
const port = 3000; // You can choose any available port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});