import express from "express";
import { Express } from "express";

export class HeartBeatServer {

  static create(): HeartBeatServer {
    return new HeartBeatServer(express());
  }

  public constructor(
    private readonly express: Express,
  ) {
    
  }

  public start(port: number): void {
    this.express.get("/heartbeat", (req, res) => {
      res.send("We still pumpin'");
    });

    this.express.listen(port, () => {
      console.log(`Heartbeat server started on port ${port}`);
    });
  }
}