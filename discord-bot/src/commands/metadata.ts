import {
  ApplicationCommandType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

import { Args } from "./args.js";
import { Language } from "../models/enum-helpers/language.js";
import { Lang } from "../services/index.js";

export const ChatCommandMetadata: {
  [command: string]: RESTPostAPIChatInputApplicationCommandsJSONBody;
} = {
  HELP: {
    type: ApplicationCommandType.ChatInput,
    name: Lang.getRef("chatCommands.help", Language.Default),
    name_localizations: Lang.getRefLocalizationMap("chatCommands.help"),
    description: Lang.getRef("commandDescs.help", Language.Default),
    description_localizations: Lang.getRefLocalizationMap("commandDescs.help"),
    dm_permission: true,
    default_member_permissions: undefined,
    options: [
      {
        ...Args.HELP_OPTION,
        required: true,
      },
    ],
  },
  RLCRAFT: {
    type: ApplicationCommandType.ChatInput,
    name: Lang.getRef("chatCommands.rlcraft", Language.Default),
    name_localizations: Lang.getRefLocalizationMap("chatCommands.rlcraft"),
    description: Lang.getRef("commandDescs.rlcraft", Language.Default),
    description_localizations: Lang.getRefLocalizationMap("commandDescs.rlcraft"),
    dm_permission: true,
    default_member_permissions: undefined,
    options: [
      {
        ...Args.RLCRAFT_OPTION,
        required: true,
      }
    ]
  },
  START_SERVER: {
    type: ApplicationCommandType.ChatInput,
    name: Lang.getRef("chatCommands.startServer", Language.Default),
    name_localizations: Lang.getRefLocalizationMap("chatCommands.startServer"),
    description: Lang.getRef("commandDescs.startServer", Language.Default),
    description_localizations: Lang.getRefLocalizationMap(
      "commandDescs.startServer"
    ),
    dm_permission: true,
    default_member_permissions: undefined,
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
  },
};
