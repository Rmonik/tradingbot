"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeartBeatServer_1 = require("./core/HeartBeatServer");
const port = 8888;
const server = HeartBeatServer_1.HeartBeatServer.create();
server.start(port);
