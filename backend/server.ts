import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import logger from "morgan";
import personRouter from "./routes/person";
import locationRouter from "./routes/location";
import productRouter from "./routes/product";
import repositoryRouter from "./routes/repository";
import searchRouter from "./routes/search";
import sessionsRouter from "./routes/sessions";

const app = express();

// Enable various express middlewares for abstracting more complex features

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true,               // Allow credentials (cookies, authorization headers, TLS client certificates)
}));
app.use(express.json())
app.use(cookieParser())
app.use(logger('dev'));

// Person endpoints
app.use('/api/person', personRouter
/*
#swagger.tags = ['person']
*/);
app.use('/api/location', locationRouter
/*
#swagger.tags = ['location']
*/);
app.use('/api/product', productRouter
/*
#swagger.tags = ['product']
 */
);
app.use('/api/repository', repositoryRouter
/*
#swagger.tags = ['repository']
 */
);
app.use('/api/sessions', sessionsRouter
/*
#swagger.tags = ['sessions']
 */
);
app.use('/api/search', searchRouter
/*
#swagger.tags['search']
 */
);

// Start the server
const port = 3000; // You can choose any available port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
