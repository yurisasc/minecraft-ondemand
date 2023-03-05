import AWS from "aws-sdk";

export class AWSService {
  public async init(): Promise<void> {
    AWS.config.update({
      region: process.env.SERVER_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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
      cluster: process.env.CLUSTER_NAME,
      service: process.env.SERVICE_NAME,
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
