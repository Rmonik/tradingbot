import { ContainerIdentifiers } from "./core/Container/ContainerIdentifiers.js";
import { ContainerManager } from "./core/Container/ContainerManager.js";
import { HeartBeatServer } from "./core/HeartBeatServer.js";
import { JobScheduler } from "./core/JobScheduler.js";
import { ResolutionMode } from "./core/types.js";


// Create DI Container
const containerManager = new ContainerManager();
containerManager.init(ResolutionMode.Main);
const container = containerManager.getContainer();

// generate db name
container.bind(ContainerIdentifiers.DatabaseName).toConstantValue("production");

// Create heartbeat server
const port = 8888;
const server = HeartBeatServer.create();
server.start(port);

// Create job scheduler
container.bind(JobScheduler).toSelf();
const jobScheduler = container.get(JobScheduler);
jobScheduler.initSchedules();

// Graceful shutdown
const gracefulShutdownTimer = 1*1000;    // 1 minute
process.on("SIGINT", () => {
  console.log("SIGINT received");
  jobScheduler.gracefulShutdown(gracefulShutdownTimer);
});

