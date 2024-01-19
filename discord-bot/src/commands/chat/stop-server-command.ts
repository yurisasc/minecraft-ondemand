import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsString,
} from "discord.js";
import { Language } from "../../models/enum-helpers/language.js";
import { EventData } from "../../models/internal-models.js";
import { Lang } from "../../services/index.js";
import { InteractionUtils } from "../../utils/interaction-utils.js";
import { Command, CommandDeferType } from "../index.js";
import { MultiServersService } from "../../services/multi-servers-service.js";

export class StopServerCommand implements Command {
  constructor(private readonly multiServersService: MultiServersService) {}

  public names = [Lang.getRef("chatCommands.stopServer", Language.Default)];
  public deferType = CommandDeferType.PUBLIC;
  public requireClientPerms: PermissionsString[] = [];

  public async execute(
    intr: ChatInputCommandInteraction,
    data: EventData
  ): Promise<void> {
    try {
      let embed: EmbedBuilder;
      let args = {
        option: intr.options.getString(
          Lang.getRef("arguments.option", Language.Default)
        ),
      };

      if (args.option) {
        try {
          // TODO: Check that the server is running before stopping it
          await this.multiServersService.stopServerByName(args.option);
          embed = Lang.getEmbed("displayEmbeds.stopServer", data.lang, {
            SERVER_NAME: args.option,
          });
        } catch (error) {
          embed = Lang.getEmbed("displayEmbeds.invalidServerName", data.lang, {
            SERVER_NAME: args.option,
          });
        }
      } else {
        embed = Lang.getEmbed("displayEmbeds.emptyServerName", data.lang);
      }

      await InteractionUtils.send(intr, embed);
    } catch {
      const embed: EmbedBuilder = Lang.getEmbed(
        "displayEmbeds.noCredentials",
        data.lang
      );

      await InteractionUtils.send(intr, embed);
    }
  }
}
