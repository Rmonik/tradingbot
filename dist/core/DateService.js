"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
class DateService {
    static create() {
        return new DateService();
    }
    constructor() { }
    getNow() {
        return new Date();
    }
}
exports.DateService = DateService;
