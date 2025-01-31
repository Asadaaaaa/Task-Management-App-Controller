import mongoose from 'mongoose';

class Tasks {
  constructor(server) {
    // Define the schema
    const taskSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      dueDate: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
      }
    }, {
      collection: 'tasks',
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    });

    // Add soft delete field
    taskSchema.add({
      deleted_at: {
        type: Date,
        default: null
      }
    });

    // Create the model
    this.table = mongoose.model('Tasks', taskSchema);
  }
}

export default Tasks; 