import './config';
import express from 'express';
import cors from 'cors';
import auth from './controllers/auth';
import jwtRouter from './jwt';
import users from './controllers/users';

const app = express();
app.use(cors());
app.use(express.json());
app.use(jwtRouter);
app.use(auth);
app.use('/users', users);

app.listen(3000);
