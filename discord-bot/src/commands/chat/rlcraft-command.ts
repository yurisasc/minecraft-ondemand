import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsString,
} from "discord.js";

import { RLCraftOption } from "../../enums/rlcraft-option.js";
import { Language } from "../../models/enum-helpers/language.js";
import { EventData } from "../../models/internal-models.js";
import { AWSService, Lang } from "../../services/index.js";
import {
  ClientUtils,
  FormatUtils,
  InteractionUtils,
} from "../../utils/index.js";
import { Command, CommandDeferType } from "../index.js";

export class RLCraftCommand implements Command {
  constructor(private readonly awsService: AWSService) {}

  public names = [Lang.getRef("chatCommands.rlcraft", Language.Default)];
  public deferType = CommandDeferType.PUBLIC;
  public requireClientPerms: PermissionsString[] = [];

  public async execute(
    intr: ChatInputCommandInteraction,
    data: EventData
  ): Promise<void> {
    let args = {
      option: intr.options.getString(
        Lang.getRef("arguments.option", Language.Default)
      ) as RLCraftOption,
    };

    switch (args.option) {
      case RLCraftOption.START: {
        try {
          await this.awsService.startServer("rlcraft");
          await this.sendEmbed(intr, data, "displayEmbeds.startServer");
        } catch (err) {
          await this.sendEmbed(intr, data, "displayEmbeds.noCredentials");
        }

        break;
      }
      case RLCraftOption.STOP: {
        try {
          await this.awsService.stopServer("rlcraft");
          await this.sendEmbed(intr, data, "displayEmbeds.stopServer");
        } catch (err) {
          await this.sendEmbed(intr, data, "displayEmbeds.noCredentials");
        }

        break;
      }
    }
  }

  private async sendEmbed(
    intr: ChatInputCommandInteraction,
    data: EventData,
    embedKey: string
  ) {
    const embed: EmbedBuilder = Lang.getEmbed(embedKey, data.lang);

    await InteractionUtils.send(intr, embed);
  }
}
