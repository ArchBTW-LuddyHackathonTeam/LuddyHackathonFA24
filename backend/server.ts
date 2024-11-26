import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import personRouter from "./routes/person";
import locationRouter from "./routes/location";
import productRouter from "./routes/product";
import repositoryRouter from "./routes/repository";
import searchRouter from "./routes/search";
import sessionsRouter from "./routes/sessions";

const app = express();

let origin: RegExp;

if(process.env.FRONTEND_ORIGIN){
    origin = new RegExp(`${process.env.FRONTEND_ORIGIN}.*`);
}
else{
    origin = /http:\/\/localhost:5173.*/;
}

const corsOptions = {
    origin: origin, // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true               // Allow credentials (cookies, authorization headers, TLS client certificates)
}

// Enable various express middlewares for abstracting more complex features

// Configure CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

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

// 404 Handler for unknown routes
app.use((_req, res) => {
    res.status(404).json({error: 'Route not found'});
});

//generic error handler
app.use((err: any, _req: any, res: any, _next: any) => {
    console.error('Unhandled error:', err);
    res.status(500).json({error: 'Internal server error'});
});

// Start the server
const port = 3000; // You can choose any available port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
