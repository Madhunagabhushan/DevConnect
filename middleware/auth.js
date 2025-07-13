import jwt from 'jsonwebtoken';
import config from 'config';

export default function (req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if there's a token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT_SECRET from config module
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Attach the user info to the request object
    req.user = decoded.user;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Something went wrong with auth middleware:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
