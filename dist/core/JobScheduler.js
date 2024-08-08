"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobScheduler = void 0;
const TimeUtils_1 = require("../utils/TimeUtils");
const Cron_1 = require("./Cron");
const Job_1 = require("./Job");
class JobScheduler {
    static create() {
        return new JobScheduler(Cron_1.Cron.create());
    }
    constructor(cron) {
        this.cron = cron;
    }
    scheduleCron(cron, job) {
        this.cron.scheduleCron(cron, job.run);
    }
    scheduleDate(date, job) {
        this.cron.scheduleDate(date, job.run);
    }
    initSchedules() {
        this.scheduleCron("*/3 * * * * *", Job_1.JobTest.create());
    }
    queueTask(job, delayms) {
        this.scheduleDate((0, TimeUtils_1.addTime)(new Date(), delayms !== null && delayms !== void 0 ? delayms : 0, "milliseconds" /* TimeUnit.Milliseconds */), job);
    }
    gracefulShutdown(timeLimitMs) {
        this.cron.gracefulShutdown(timeLimitMs);
    }
}
exports.JobScheduler = JobScheduler;
