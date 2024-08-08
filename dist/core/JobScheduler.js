"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobScheduler = void 0;
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
    initSchedules() {
        this.scheduleCron("*/3 * * * * *", Job_1.JobTest.create());
    }
}
exports.JobScheduler = JobScheduler;
