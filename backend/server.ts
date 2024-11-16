import express from "express";
import cors from "cors";
import DBInterface from "./db-interface"

const app = express();

// Enable CORS for all routes
app.use(cors());

//Initializing Database
const _db: DBInterface = new DBInterface();

if(_db){
  console.log("Database initialized correctly");
}

// Test route
app.get('/api/test', (_req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
const port = 3000; // You can choose any available port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});