import {
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  PermissionsString,
} from "discord.js";
import { Language } from "../../models/enum-helpers/language.js";
import { EventData } from "../../models/internal-models.js";
import { AWSService, Lang } from "../../services/index.js";
import { InteractionUtils } from "../../utils/interaction-utils.js";
import { Command, CommandDeferType } from "../index.js";

export class StopServerCommand implements Command {
  constructor(private readonly awsService: AWSService) {}

  public names = [Lang.getRef("chatCommands.stopServer", Language.Default)];
  public deferType = CommandDeferType.PUBLIC;
  public requireClientPerms: PermissionsString[] = [];

  public async execute(
    intr: CommandInteraction<CacheType>,
    data: EventData
  ): Promise<void> {
    this.awsService.stopServer();

    const embed: EmbedBuilder = Lang.getEmbed(
      "displayEmbeds.stopServer",
      data.lang
    );

    await InteractionUtils.send(intr, embed);
  }
}
