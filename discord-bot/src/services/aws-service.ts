import AWS from "aws-sdk";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let ServerConfig = require("../../config/server-config.json");

export class AWSService {
  public async init(): Promise<void> {
    AWS.config.update({
      region: ServerConfig.SERVER_REGION,
      credentials: {
        accessKeyId: ServerConfig.AWS_ACCESS_KEY_ID,
        secretAccessKey: ServerConfig.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  public async startServer(): Promise<void> {
    this.setServiceDesiredCount(1);
  }

  public async stopServer(): Promise<void> {
    this.setServiceDesiredCount(0);
  }

  private setServiceDesiredCount(desiredCount: number): void {
    const ecs = new AWS.ECS();

    const params = {
      cluster: "minecraft",
      service: "minecraft-server",
      desiredCount: desiredCount,
    };

    ecs.updateService(params, (err, data) => {
      if (err) {
        console.log(`Error updating service: ${err}`);
      } else {
        console.log(`Service updated: ${data}`);
      }
    });
  }
}
