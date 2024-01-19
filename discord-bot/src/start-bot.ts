import * as dotenv from "dotenv";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { REST } from "@discordjs/rest";
import { Options, Partials } from "discord.js";
import { createRequire } from "node:module";

dotenv.config({
  path: path.resolve(dirname(fileURLToPath(import.meta.url)), "../.env"),
});

import {
  StartServerCommand,
  StopServerCommand,
} from "./commands/chat/index.js";
import { Args, ChatCommandMetadata, Command } from "./commands/index.js";
import { CommandHandler } from "./events/index.js";
import { CustomClient } from "./extensions/custom-client.js";
import { Bot } from "./models/bot.js";
import {
  AWSService,
  CommandRegistrationService,
  EventDataService,
  Logger,
} from "./services/index.js";
import {
  MultiServersService,
  getServerNames,
} from "./services/multi-servers-service.js";

const require = createRequire(import.meta.url);
let Config = require("../config/config.json");
let Logs = require("../lang/logs.json");

async function start(): Promise<void> {
  // Services
  let eventDataService = new EventDataService();
  let awsService = new AWSService();
  let multiServersService = new MultiServersService(awsService);

  // Client
  let client = new CustomClient({
    intents: Config.client.intents,
    partials: (Config.client.partials as string[]).map(
      (partial) => Partials[partial]
    ),
    makeCache: Options.cacheWithLimits({
      // Keep default caching behavior
      ...Options.DefaultMakeCacheSettings,
      // Override specific options from config
      ...Config.client.caches,
    }),
  });

  // Commands
  let commands: Command[] = [
    new StartServerCommand(multiServersService),
    new StopServerCommand(multiServersService),
  ];

  let commandHandler = new CommandHandler(commands, eventDataService);

  // Bot
  const clientToken = process.env.CLIENT_TOKEN;
  let bot = new Bot(clientToken, client, commandHandler);

  // Register
  if (process.argv[2] == "commands") {
    try {
      let rest = new REST({ version: "10" }).setToken(clientToken);
      let commandRegistrationService = new CommandRegistrationService(rest);
      let localCmds = [
        ...Object.values(ChatCommandMetadata(getServerNames())).sort((a, b) =>
          a.name > b.name ? 1 : -1
        ),
      ];
      await commandRegistrationService.process(localCmds, process.argv);
    } catch (error) {
      Logger.error(Logs.error.commandAction, error);
    }
    // Wait for any final logs to be written.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    process.exit();
  }

  await bot.start();
}

process.on("unhandledRejection", (reason, _promise) => {
  Logger.error(Logs.error.unhandledRejection, reason);
});

start().catch((error) => {
  Logger.error(Logs.error.unspecified, error);
});
