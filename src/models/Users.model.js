// Library
import mongoose from 'mongoose';
import Sha256Helper from '../helpers/SHA256.helper.js';

class Users {
  constructor(server) {
    const sha256Helper = new Sha256Helper();
    
    // Define the schema
    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        maxLength: 15
      },
      email: {
        type: String,
        required: true,
        maxLength: 68
      },
      password: {
        type: String,
        required: true,
        set: (password) => sha256Helper.getHash(password)
      }
    }, {
      collection: 'users',
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    });

    // Add soft delete field
    userSchema.add({
      deleted_at: {
        type: Date,
        default: null
      }
    });

    // Create the model
    this.table = mongoose.model('Users', userSchema);
  }
}

export default Users;
