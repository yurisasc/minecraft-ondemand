import AWS from "aws-sdk";
import { AWSProfile } from "../models/internal-models";

export class AWSService {
  public async startServer(profile: AWSProfile): Promise<void> {
    this.setProfile(profile);
    this.setServiceDesiredCount(1);
  }

  public async stopServer(profile: AWSProfile): Promise<void> {
    this.setProfile(profile);
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

  private setProfile(profile: AWSProfile) {
    const credentials = new AWS.Credentials({
      accessKeyId: profile.accessKeyId,
      secretAccessKey: profile.secretAccessKey,
    });

    const config = new AWS.Config({
      credentials: credentials,
      region: profile.region,
    });

    AWS.config.update(config);
  }
}
