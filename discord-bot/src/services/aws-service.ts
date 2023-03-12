import AWS from "aws-sdk";
import { AWSProfile } from "../models/internal-models";

export class AWSService {
  private profiles: AWSProfile[];

  public async init(): Promise<void> {
    this.profiles = JSON.parse(process.env.AWS_PROFILES ?? "[]");
  }

  public async startServer(profileName: string): Promise<void> {
    this.setProfile(profileName);
    this.setServiceDesiredCount(1);
  }

  public async stopServer(profileName: string): Promise<void> {
    this.setProfile(profileName);
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

  private setProfile(profileName: string) {
    const profile = this.profileByName(profileName);

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

  private profileByName(profileName: string): AWSProfile {
    return this.profiles.find((profile) => profile.profileName === profileName);
  }
}
