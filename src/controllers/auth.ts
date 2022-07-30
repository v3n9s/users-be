import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { createUser, getUser, updateUser } from '../db/users';

const auth = express.Router();

auth.post('/login', async (req, res) => {
  if (
    typeof req.body.name === 'string'
    && typeof req.body.password === 'string'
    && req.body.name.length
    && req.body.password.length
  ) {
    const user = await getUser({ by: ['name', req.body.name] });
    if (user && await bcryptjs.compare(req.body.password, user.password)) {
      const { password, sessions, ...safeUser } = user;
      const token = jwt.sign(safeUser, config.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 7
      });
      if (await updateUser({ id: user.id, sessions: [...user.sessions, token] })) {
        res.status(201).json({token});
      } else {
        res.sendStatus(500);
      }
    } else {
      res.status(400).json({ message: 'wrong name or(and) password' });
    }
  } else {
    res.status(400).json({ message: 'you must pass truthy strings' });
  }
});

auth.post('/register', async (req, res) => {
  if (
    typeof req.body.name === 'string'
    && typeof req.body.email === 'string'
    && typeof req.body.password === 'string'
    && req.body.name.length
    && req.body.email.length
    && req.body.password.length
  ) {
    const hash = await bcryptjs.hash(req.body.password, 10);
    await createUser({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      registrationDate: new Date()
    });
    res.sendStatus(201);
  } else {
    res.status(400).json({ message: 'you must pass truthy strings' });
  }
});

export default auth;
