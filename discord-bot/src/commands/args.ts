import {
  APIApplicationCommandBasicOption,
  ApplicationCommandOptionType,
} from "discord.js";

import { HelpOption } from "../enums/help-option.js";
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

  public static startOption(
    serverNames: string[]
  ): APIApplicationCommandBasicOption {
    return {
      name: Lang.getRef("arguments.option", Language.Default),
      name_localizations: Lang.getRefLocalizationMap("arguments.option"),
      description: Lang.getRef("argDescs.startOption", Language.Default),
      description_localizations: Lang.getRefLocalizationMap(
        "argDescs.startOption"
      ),
      type: ApplicationCommandOptionType.String,
      choices: serverNames.map((serverName) => {
        return {
          name: serverName,
          value: serverName,
        };
      }),
    };
  }

  public static stopOption(
    serverNames: string[]
  ): APIApplicationCommandBasicOption {
    return {
      name: Lang.getRef("arguments.option", Language.Default),
      name_localizations: Lang.getRefLocalizationMap("arguments.option"),
      description: Lang.getRef("argDescs.stopOption", Language.Default),
      description_localizations: Lang.getRefLocalizationMap(
        "argDescs.stopOption"
      ),
      type: ApplicationCommandOptionType.String,
      choices: serverNames.map((serverName) => {
        return {
          name: serverName,
          value: serverName,
        };
      }),
    };
  }
}
