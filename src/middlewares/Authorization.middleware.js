import ResponsePreset from '../helpers/ResponsePreset.helper.js';

// Library
import JWT from 'jsonwebtoken';

class AuthorizationMiddleware {
  constructor(server) {
    this.server = server;
    this.ResponsePreset = new ResponsePreset();
  }

  check() {
    return (req, res, next) => {
      const token = req.headers['authorization'];
      
      if(!token || token === 'undefined') {
        return res.status(401).json(this.ResponsePreset.resErr(
          401,
          'Request Unauthorized',
          'token',
          { code: -1 }
        ));
      }
      
      JWT.verify(token, this.server.env.JWT_TOKEN_SECRET, (err, data) => {
        if(err) {
          return res.status(401).json(this.ResponsePreset.resErr(
            401,
            'Token Unauthorized',
            'token',
            { code: -2 }
          ));
        }

        // Set the decoded token data to the request object
        req.middlewares.authorization = {
          userId: data.data.userId,
          email: data.data.email,
          username: data.data.username
        };

        return next();
      });
    }
  }
}

export default AuthorizationMiddleware;
