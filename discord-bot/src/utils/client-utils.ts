import {
  ApplicationCommand,
  Client,
} from "discord.js";

export class ClientUtils {
  public static async findAppCommand(
    client: Client,
    name: string
  ): Promise<ApplicationCommand> {
    let commands = await client.application.commands.fetch();
    return commands.find((command) => command.name === name);
  }
}
