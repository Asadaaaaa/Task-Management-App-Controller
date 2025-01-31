import Tasks from '../../models/Tasks.model.js';

class TasksService {
  constructor(server) {
    this.server = server;
    this.Tasks = new Tasks(this.server).table;
  }

  async create(userId, taskData) {
    const task = await this.Tasks.create({
      userId,
      ...taskData
    });
    return task;
  }

  async getAll(userId, status = null) {
    const query = {
      userId,
      deleted_at: null
    };
    
    if (status) {
      query.status = status;
    }

    const tasks = await this.Tasks.find(query).sort({ created_at: -1 });
    return tasks;
  }

  async update(userId, taskId, updateData) {
    const task = await this.Tasks.findOneAndUpdate(
      { _id: taskId, userId, deleted_at: null },
      { $set: updateData },
      { new: true }
    );
    
    if (!task) return -1;
    return task;
  }

  async delete(userId, taskId) {
    const task = await this.Tasks.findOneAndUpdate(
      { _id: taskId, userId, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
    
    if (!task) return -1;
    return task;
  }
}

export default TasksService; 