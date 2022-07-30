import config from './config';
import express from 'express';
import { expressjwt } from 'express-jwt';
import { getUser } from './db/users';

const jwtRouter = express.Router();

jwtRouter.use(expressjwt({
  secret: config.JWT_SECRET,
  algorithms: ['HS256'],
  isRevoked: async (req, token) => {
    if (typeof token?.payload !== 'string' && token?.payload.id) {
      const user = await getUser({ by: ['id', token.payload.id] });
      const rawToken = req.headers.authorization?.split(' ')[1];
      if (user && rawToken) {
        return !user.sessions.includes(rawToken);
      }
    }
    return true;
  }
}).unless({
  path: ['/login', '/register']
}));

jwtRouter.use(((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: err.message });
  } else {
    next();
  }
}) as express.ErrorRequestHandler);

export default jwtRouter;
