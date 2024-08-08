"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeartBeatServer_1 = require("./core/HeartBeatServer");
const JobScheduler_1 = require("./core/JobScheduler");
const port = 8888;
const server = HeartBeatServer_1.HeartBeatServer.create();
server.start(port);
const jobScheduler = JobScheduler_1.JobScheduler.create();
jobScheduler.initSchedules();
