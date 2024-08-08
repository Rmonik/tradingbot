"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cron = void 0;
const node_schedule_1 = require("node-schedule");
class Cron {
    static create() {
        return new Cron();
    }
    constructor() { }
    scheduleCron(cron, cb) {
        (0, node_schedule_1.scheduleJob)(cron, () => __awaiter(this, void 0, void 0, function* () { return yield cb(); }));
    }
    scheduleDate(date, cb) {
        (0, node_schedule_1.scheduleJob)(date, () => __awaiter(this, void 0, void 0, function* () { return yield cb(); }));
    }
}
exports.Cron = Cron;
