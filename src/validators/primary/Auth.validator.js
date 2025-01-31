class AuthScheme {
  register = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        maxLength: 68,
        minLength: 9,
        pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        nullable: false
      },
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 30,
        pattern: '^[a-zA-Z0-9._]+$',
        nullable: false
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 18,
        pattern: '^\\S+$',
        nullable: false
      }
    },
    required: ['email', 'username', 'password'],
    additionalProperties: false
  };

  login = {
    type: 'object',
    properties: {
      emailOrUsername: {
        type: 'string',
        maxLength: 68,
        minLength: 3,
        nullable: false
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 18,
        pattern: '^\\S+$',
        nullable: false
      }
    },
    required: ['emailOrUsername', 'password'],
    additionalProperties: false
  };
}

export default AuthScheme;