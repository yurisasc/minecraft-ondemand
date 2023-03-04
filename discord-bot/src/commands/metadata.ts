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
  TEST: {
    type: ApplicationCommandType.ChatInput,
    name: Lang.getRef("chatCommands.test", Language.Default),
    name_localizations: Lang.getRefLocalizationMap("chatCommands.test"),
    description: Lang.getRef("commandDescs.test", Language.Default),
    description_localizations: Lang.getRefLocalizationMap("commandDescs.test"),
    dm_permission: true,
    default_member_permissions: undefined,
  },
};
