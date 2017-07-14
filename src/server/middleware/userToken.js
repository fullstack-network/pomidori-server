import jwt from 'jsonwebtoken'
import { ExtractJwt } from 'passport-jwt'

import User from '../models/user.model'

export default function verifyToken(req, res, next) {
  const token = ExtractJwt.fromAuthHeader()(req);
  const decoded = jwt.verify(token, 'FAKE_SECRET');

  User.get(decoded.userId).then((user) => {
    req.user = user;
    req.userId = user._id;

    next();
  });
}
