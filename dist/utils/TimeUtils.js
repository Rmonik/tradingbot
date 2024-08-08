"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTime = addTime;
function addTime(date, time, units) {
    switch (units) {
        case "milliseconds" /* TimeUnit.Milliseconds */:
            return new Date(date.getTime() + time);
        case "seconds" /* TimeUnit.Seconds */:
            return new Date(date.getTime() + time * 1000);
        case "minutes" /* TimeUnit.Minutes */:
            return new Date(date.getTime() + time * 1000 * 60);
        case "hours" /* TimeUnit.Hours */:
            return new Date(date.getTime() + time * 1000 * 60 * 60);
    }
}
