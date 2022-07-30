import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../db/users';

const users = express.Router();

users.get('/', async (req, res) => {
  res.send(await getUsers({
    select: [
      'id',
      'name',
      'email',
      'isBlocked',
      'registrationDate',
      'lastLoginDate'
    ]
  }));
});

users.use('/:id', async (req, res, next) => {
  const id = +req.params.id;
  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'id must be number' });
  } else {
    if(await getUser({ by: ['id', id] })) {
      next();
    } else {
      res.status(404).json({ message: `there is no user with id ${id}` });
    }
  }
});

users.route('/:id')
  .get(async (req, res) => {
    const id = +req.params.id;
    res.status(200).json(await getUser({
      by: ['id', id],
      select: [
        'id',
        'name',
        'email',
        'registrationDate',
        'lastLoginDate',
        'isBlocked'
      ]
    }));
  })
  .patch(async (req, res) => {
    const id = +req.params.id;
    const isBlocked = !!req.body.isBlocked;
    await updateUser({ id, isBlocked });
    res.status(200).json({ message: `successfully updated user with id ${id}` });
  })
  .delete(async (req, res) => {
    const id = +req.params.id;
    await deleteUser(id);
    res.status(200).json({ message: `successfully deleted user with id: ${id}` });
  });

export default users;
