import { ContainerManager } from "./core/ContainerManager";
import { HeartBeatServer } from "./core/HeartBeatServer";
import { JobScheduler } from "./core/JobScheduler";
import { ResolutionMode } from "./core/types";

// Create DI Container
const containerManager = new ContainerManager();
containerManager.init(ResolutionMode.Main);
const container = containerManager.getContainer();

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

