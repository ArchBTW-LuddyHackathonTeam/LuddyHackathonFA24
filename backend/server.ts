import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import personRouter from "./routes/person";
import locationRouter from "./routes/location";
import productRouter from "./routes/product";
import repositoryRouter from "./routes/repository";
import sessionsRouter from "./routes/repository";
import searchRouter from "./routes/search";
import sessionsRouter from "./routes/sessions";

const app = express();

// Enable various express middlewares for abstracting more complex features
app.use(cors());
app.use(express.json())
app.use(cookieParser())

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
app.use('/api/search', searchRouter);


// Start the server
const port = 3000; // You can choose any available port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
