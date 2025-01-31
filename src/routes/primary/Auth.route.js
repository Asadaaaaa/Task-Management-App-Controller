import Primary from './Primary.js';
import AuthController from '../../controllers/primary/Auth.controller.js';

class AuthRoute extends Primary {
  constructor(server) {
    super(server);

    this.endpointPrefix = this.endpointPrefix + '/auth';
    this.AuthController = new AuthController(server);

    this.routes();
  }

  routes() {
    this.server.API.post(this.endpointPrefix + '/register', (req, res) => this.AuthController.register(req, res));
    this.server.API.post(this.endpointPrefix + '/login', (req, res) => this.AuthController.login(req, res));
    this.server.API.get(this.endpointPrefix + '/token-check', this.AuthorizationMiddleware.check(), (req, res) => this.AuthController.tokenCheck(req, res));
  }
}

export default AuthRoute;