import express from "express";
import cors from "cors";
import personRouter from "./routes/person";
import locationRouter from "./routes/location";
import productRouter from "./routes/product";
import repositoryRouter from "./routes/repository";
import sessionsRouter from "./routes/sessions";

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json())

// Test route
app.get('/api/test', (_req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Person endpoints
app.use('/api/person', personRouter);
app.use('/api/location', locationRouter);
app.use('/api/product', productRouter);
app.use('/api/repository', repositoryRouter);
app.use('/api/sessions', sessionsRouter);

// Start the server
const port = 3000; // You can choose any available port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
