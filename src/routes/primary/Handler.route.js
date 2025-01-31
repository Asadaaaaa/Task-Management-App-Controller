// Routes
import AuthRoute from "./Auth.route.js";
import TasksRoute from "./Tasks.route.js";

class PrimaryHandler {
  constructor(server) {
    new AuthRoute(server);
    new TasksRoute(server);
  }
}

export default PrimaryHandler;