import { HeartBeatServer } from "./core/HeartBeatServer";



const port = 8888;
const server = HeartBeatServer.create();
server.start(port);

