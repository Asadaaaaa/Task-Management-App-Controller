class TasksScheme {
  create = {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        nullable: false
      },
      description: {
        type: 'string',
        maxLength: 500,
        nullable: true
      },
      dueDate: {
        type: 'string',
        pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z$',
        nullable: false
      },
      status: {
        type: 'string',
        enum: ['pending', 'completed'],
        nullable: true
      }
    },
    required: ['title', 'dueDate'],
    additionalProperties: false
  };

  update = {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        nullable: true
      },
      description: {
        type: 'string',
        maxLength: 500,
        nullable: true
      },
      dueDate: {
        type: 'string',
        pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z$',
        nullable: true
      },
      status: {
        type: 'string',
        enum: ['pending', 'completed'],
        nullable: true
      }
    },
    additionalProperties: false
  };
}

export default TasksScheme; 