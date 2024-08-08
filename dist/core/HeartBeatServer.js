"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartBeatServer = void 0;
const express_1 = __importDefault(require("express"));
class HeartBeatServer {
    static create() {
        return new HeartBeatServer((0, express_1.default)());
    }
    constructor(express) {
        this.express = express;
    }
    start(port) {
        this.express.get("/heartbeat", (req, res) => {
            res.send("We still pumpin'");
        });
        this.express.listen(port, () => {
            console.log(`Heartbeat server started on port ${port}`);
        });
    }
}
exports.HeartBeatServer = HeartBeatServer;
