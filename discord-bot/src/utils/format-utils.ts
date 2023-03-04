import { ApplicationCommand, Guild, Locale } from "discord.js";

export class FormatUtils {
  public static roleMention(guild: Guild, discordId: string): string {
    if (discordId === "@here") {
      return discordId;
    }

    if (discordId === guild.id) {
      return "@everyone";
    }

    return `<@&${discordId}>`;
  }

  public static channelMention(discordId: string): string {
    return `<#${discordId}>`;
  }

  public static userMention(discordId: string): string {
    return `<@!${discordId}>`;
  }

  // TODO: Replace with ApplicationCommand#toString() once discord.js #8818 is merged
  // https://github.com/discordjs/discord.js/pull/8818
  public static commandMention(
    command: ApplicationCommand,
    subParts: string[] = []
  ): string {
    let name = [command.name, ...subParts].join(" ");
    return `</${name}:${command.id}>`;
  }
}
