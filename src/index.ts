import { HeartBeatServer } from "./core/HeartBeatServer";
import { JobScheduler } from "./core/JobScheduler";

// Create heartbeat server
const port = 8888;
const server = HeartBeatServer.create();
server.start(port);

// Create job scheduler
const jobScheduler = JobScheduler.create();
jobScheduler.initSchedules();

// Graceful shutdown
const gracefulShutdownTimer = 1*1000;    // 1 minute
process.on("SIGINT", () => {
  console.log("SIGINT received");
  jobScheduler.gracefulShutdown(gracefulShutdownTimer);
});

