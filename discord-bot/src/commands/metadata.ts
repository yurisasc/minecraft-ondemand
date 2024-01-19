import {
  ApplicationCommandType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

import { Args } from "./args.js";
import { Language } from "../models/enum-helpers/language.js";
import { Lang } from "../services/index.js";

export function ChatCommandMetadata(serverNames: string[]): {
  [command: string]: RESTPostAPIChatInputApplicationCommandsJSONBody;
} {
  return {
    START_SERVER: {
      type: ApplicationCommandType.ChatInput,
      name: Lang.getRef("chatCommands.startServer", Language.Default),
      name_localizations: Lang.getRefLocalizationMap(
        "chatCommands.startServer"
      ),
      description: Lang.getRef("commandDescs.startServer", Language.Default),
      description_localizations: Lang.getRefLocalizationMap(
        "commandDescs.startServer"
      ),
      dm_permission: true,
      default_member_permissions: undefined,
      options: [
        {
          ...Args.startOption(serverNames),
          required: true,
        },
      ],
    },
    STOP_SERVER: {
      type: ApplicationCommandType.ChatInput,
      name: Lang.getRef("chatCommands.stopServer", Language.Default),
      name_localizations: Lang.getRefLocalizationMap("chatCommands.stopServer"),
      description: Lang.getRef("commandDescs.stopServer", Language.Default),
      description_localizations: Lang.getRefLocalizationMap(
        "commandDescs.stopServer"
      ),
      dm_permission: true,
      default_member_permissions: undefined,
      options: [
        {
          ...Args.stopOption(serverNames),
          required: true,
        },
      ],
    },
  };
}
