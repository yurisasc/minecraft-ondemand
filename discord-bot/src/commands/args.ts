import {
  APIApplicationCommandBasicOption,
  ApplicationCommandOptionType,
} from "discord.js";

import { HelpOption } from "../enums/help-option.js";
import { RLCraftOption } from "../enums/rlcraft-option.js";
import { Language } from "../models/enum-helpers/language.js";
import { Lang } from "../services/index.js";

export class Args {
  public static readonly HELP_OPTION: APIApplicationCommandBasicOption = {
    name: Lang.getRef("arguments.option", Language.Default),
    name_localizations: Lang.getRefLocalizationMap("arguments.option"),
    description: Lang.getRef("argDescs.helpOption", Language.Default),
    description_localizations: Lang.getRefLocalizationMap(
      "argDescs.helpOption"
    ),
    type: ApplicationCommandOptionType.String,
    choices: [
      {
        name: Lang.getRef("helpOptionDescs.commands", Language.Default),
        name_localizations: Lang.getRefLocalizationMap(
          "helpOptionDescs.commands"
        ),
        value: HelpOption.COMMANDS,
      },
    ],
  };

  public static readonly RLCRAFT_OPTION: APIApplicationCommandBasicOption = {
    name: Lang.getRef("arguments.option", Language.Default),
    name_localizations: Lang.getRefLocalizationMap("arguments.option"),
    description: Lang.getRef("argDescs.rlcraftOption", Language.Default),
    description_localizations: Lang.getRefLocalizationMap(
      "argDescs.rlcraftOption"
    ),
    type: ApplicationCommandOptionType.String,
    choices: [
      {
        name: Lang.getRef("rlcraftOptionDescs.start", Language.Default),
        name_localizations: Lang.getRefLocalizationMap(
          "rlcraftOptionDescs.start"
        ),
        value: RLCraftOption.START,
      },
      {
        name: Lang.getRef("rlcraftOptionDescs.stop", Language.Default),
        name_localizations: Lang.getRefLocalizationMap("rlcraftOptionDescs.stop"),
        value: RLCraftOption.STOP,
      },
    ],
  }
}
