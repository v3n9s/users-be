import './config';
import express from 'express';
import cors from 'cors';
import auth from './controllers/auth';
import jwtRouter from './jwt';

const app = express();
app.use(cors());
app.use(express.json());
app.use(jwtRouter);
app.use(auth);

app.listen(3000);
