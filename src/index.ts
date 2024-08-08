import { HeartBeatServer } from "./core/HeartBeatServer";
import { JobScheduler } from "./core/JobScheduler";

// Create heartbeat server
const port = 8888;
const server = HeartBeatServer.create();
server.start(port);

// Create job scheduler
const jobScheduler = JobScheduler.create();
jobScheduler.initSchedules();