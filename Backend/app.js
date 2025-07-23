import express from 'express';
const app = express();
import dotenv from 'dotenv';
import connectToMongoDB from './src/config/mongo.config.js';
import short_url from './src/routes/short_url.routes.js';
import auth_routes from './src/routes/auth.routes.js';
import { redirectUrlController } from './src/controllers/redirect.url.controller.js';
import { errorHandler } from './src/utils/error.handler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { attachUser } from './src/utils/attachUser.js';

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Allow only your frontend origin
    credentials: true, // ✅ Allow credentials (cookies, auth headers)
  })
);
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use(attachUser);

const port = process.env.port || 5000;

app.use('/api/auth',auth_routes)
app.use('/api/create', short_url)


app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is running http://localhost:${port}`);
});

app.get('/:id', redirectUrlController);

app.use(errorHandler);

// app.use(attachUser);
