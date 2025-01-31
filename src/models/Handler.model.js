import mongoose from 'mongoose';

class ModelHandler {
  constructor(server) {
    this.server = server;
    this.mongoose = mongoose;
    
    // Configure mongoose
    this.mongoose.set('strictQuery', true);
  }

  async connect() {
    try {
      // Connect to MongoDB
      await this.mongoose.connect(this.server.env.DB_MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: this.server.env.DB_MONGO_NAME
      });

      this.server.sendLogs('MongoDB Connected Successfully');
      return 1;
    } catch (error) {
      this.server.sendLogs('MongoDB Connection Error: ' + error.message);
      return -1;
    }
  }

  // Disconnect from database
  async disconnect() {
    try {
      await this.mongoose.disconnect();
      this.server.sendLogs('MongoDB Disconnected Successfully');
      return 1;
    } catch (error) {
      this.server.sendLogs('MongoDB Disconnection Error: ' + error.message);
      return -1;
    }
  }
}

export default ModelHandler;
