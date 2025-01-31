import ResponsePreset from '../../helpers/ResponsePreset.helper.js';
import TasksValidator from '../../validators/primary/Tasks.validator.js';
import TasksService from '../../services/primary/Tasks.service.js';
import mongoose from 'mongoose';

import Ajv from 'ajv';

class TasksController {
  constructor(server) {
    this.server = server;
    this.ResponsePreset = new ResponsePreset();
    this.Ajv = new Ajv();
    this.DataScheme = new TasksValidator();
    this.TasksService = new TasksService(this.server);
  }

  async create(req, res) {
    const schemeValidate = this.Ajv.compile(this.DataScheme.create);
    
    if(!schemeValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeValidate.errors[0].message,
      'validator',
      schemeValidate.errors[0]
    ));

    const task = await this.TasksService.create(req.middlewares.authorization.userId, req.body);
    return res.status(201).json(this.ResponsePreset.resOK('Task created successfully', task));
  }

  async getAll(req, res) {
    const { status } = req.query;
    
    if (status && !['pending', 'completed'].includes(status)) {
      return res.status(400).json(this.ResponsePreset.resErr(
        400,
        'Invalid status value',
        'service',
        { code: -1 }
      ));
    }

    const tasks = await this.TasksService.getAll(req.middlewares.authorization.userId, status);
    return res.status(200).json(this.ResponsePreset.resOK('OK', tasks));
  }

  async update(req, res) {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json(this.ResponsePreset.resErr(
        400,
        'Invalid task ID format',
        'service',
        { code: -1 }
      ));
    }

    const schemeValidate = this.Ajv.compile(this.DataScheme.update);
    
    if(!schemeValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeValidate.errors[0].message,
      'validator',
      schemeValidate.errors[0]
    ));

    const task = await this.TasksService.update(
      req.middlewares.authorization.userId,
      req.params.id,
      req.body
    );

    if(task === -1) return res.status(404).json(this.ResponsePreset.resErr(
      404,
      'Task not found',
      'service',
      { code: -2 }
    ));

    return res.status(200).json(this.ResponsePreset.resOK('Task updated successfully', task));
  }

  async delete(req, res) {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json(this.ResponsePreset.resErr(
        400,
        'Invalid task ID format',
        'service',
        { code: -1 }
      ));
    }

    const task = await this.TasksService.delete(
      req.middlewares.authorization.userId,
      req.params.id
    );

    if(task === -1) return res.status(404).json(this.ResponsePreset.resErr(
      404,
      'Task not found',
      'service',
      { code: -2 }
    ));

    return res.status(200).json(this.ResponsePreset.resOK('Task deleted successfully', null));
  }
}

export default TasksController; 