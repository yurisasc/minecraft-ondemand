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

export class StartServerCommand implements Command {
  constructor(private readonly multiServersService: MultiServersService) {}

  public names = [Lang.getRef("chatCommands.startServer", Language.Default)];
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
          await this.multiServersService.startServerByName(args.option);
          embed = Lang.getEmbed("displayEmbeds.startServer", data.lang, {
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
