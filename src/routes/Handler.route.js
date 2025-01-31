import PrimaryHandler from './primary/Handler.route.js';
// import AdminHandler from './admin/Handler.route.js';

class RoutesHandler {
  constructor(server) {
    new PrimaryHandler(server);
    // new AdminHandler(server);
  }
}

export default RoutesHandler;