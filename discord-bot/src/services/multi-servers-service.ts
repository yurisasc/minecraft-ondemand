import { AWSProfile, MinecraftServer } from "../models/internal-models";
import { AWSService } from "./aws-service";

export class MultiServersService {
  private servers: MinecraftServer[];

  constructor(private readonly awsService: AWSService) {
    this.servers = readServerConfigs();
  }

  public async startServerByName(name: string): Promise<void> {
    const awsAccount = this.awsAccountByName(name);
    await this.awsService.startServer(awsAccount);
  }

  public async stopServerByName(name: string): Promise<void> {
    const awsAccount = this.awsAccountByName(name);
    await this.awsService.stopServer(awsAccount);
  }

  private awsAccountByName(name: string): AWSProfile {
    const awsAccount = this.servers.find(
      (server) => server.name === name
    )?.awsAccount;

    if (!awsAccount) throw Error(`Server ${name} not configured correctly`);
    return awsAccount;
  }
}

export function readServerConfigs(): MinecraftServer[] {
  return JSON.parse(process.env.SERVERS_CONFIG ?? "[]");
}

export function getServerNames(): string[] {
  return readServerConfigs().map((server) => server.name);
}
