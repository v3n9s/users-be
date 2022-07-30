import './config';
import express from 'express';
import cors from 'cors';
import auth from './controllers/auth';

const app = express();
app.use(cors());
app.use(express.json());
app.use(auth);

app.listen(3000);
