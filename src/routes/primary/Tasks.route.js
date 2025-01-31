import Primary from './Primary.js';
import TasksController from '../../controllers/primary/Tasks.controller.js';

class TasksRoute extends Primary {
  constructor(server) {
    super(server);

    this.endpointPrefix = this.endpointPrefix + '/tasks';
    this.TasksController = new TasksController(this.server);

    this.routes();
  }

  routes() {
    this.server.API.post(this.endpointPrefix, this.AuthorizationMiddleware.check(), (req, res) => this.TasksController.create(req, res));
    this.server.API.get(this.endpointPrefix, this.AuthorizationMiddleware.check(), (req, res) => this.TasksController.getAll(req, res));
    this.server.API.put(this.endpointPrefix + '/:id', this.AuthorizationMiddleware.check(), (req, res) => this.TasksController.update(req, res));
    this.server.API.delete(this.endpointPrefix + '/:id', this.AuthorizationMiddleware.check(), (req, res) => this.TasksController.delete(req, res));
  }
}

export default TasksRoute;
