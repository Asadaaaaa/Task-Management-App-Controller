// Helpers
import sendLogs from './helpers/Logger.helper.js';

// Handlers
import GlobalMiddleware from './middlewares/Global.middleware.js';
import RouteHandler from './routes/Handler.route.js';
import ModelHandler from './models/Handler.model.js';

// Library
import * as dotenv from 'dotenv';
import os from 'os';
import cluster from 'cluster';
import FS from 'fs-extra';
import Express from 'express';

class Server {
  constructor() {
    // Server Logger
    this.sendLogs = sendLogs;
    
    // File System
    this.FS = FS;

    // .env config
    dotenv.config();
    this.env = process.env;

    this.serverThreads();
  }

  serverThreads() { 
    // Total Server CPUs
    const numCPUs = os.cpus().length;

    if (cluster.isPrimary) {
      this.sendLogs(`Total CPUs ${numCPUs}`);
      this.sendLogs(`Starting Server with ${this.env.SERVER_THREADS} threads...`);

      // Fork workers.
      for (let i = 0; i < this.env.SERVER_THREADS; i++) {
        cluster.fork();
      }

      // This event worker died
      cluster.on('exit', (worker) => {
        this.sendLogs(`worker ${worker.process.pid} died`);
      });
    } else {
      this.init();
    }
  }

  async init() {
    // Initiate Server Data
    const serverDataPath = '/server_data';
    const resourceFolder = '/src/resources';

    if (!FS.existsSync(process.cwd() + serverDataPath)) {
      this.sendLogs('Initiate Server Data...');
      this.FS.mkdirSync(process.cwd() + serverDataPath);
      this.FS.copySync(process.cwd() + resourceFolder, process.cwd() + serverDataPath);
    }

    // Initialize MongoDB connection
    this.model = new ModelHandler(this);
    const isModelConnected = await this.model.connect();

    if (isModelConnected === -1) {
      this.sendLogs('Failed to start server due to database connection error');
      process.exit(1);
    }
    
    this.run();
  }

  run() {
    this.API = Express();
    this.GlobalMiddleware = new GlobalMiddleware(this);

    // Initialize global middleware
    this.GlobalMiddleware.global();

    // Initialize route handler
    new RouteHandler(this);


    this.API.listen(this.env.PORT, this.env.IP, () => this.sendLogs(`Server Started, Listening PORT ${this.env.PORT}`));
  }
}

new Server();