import { Locale } from "discord.js";

// This class is used to store and pass data along in events
export class EventData {
  // TODO: Add any data you want to store
  constructor(
    // Event language
    public lang: Locale,
    // Guild language
    public langGuild: Locale
  ) {}
}

// This class is used to store AWS profile credentials
export class AWSProfile {
  constructor(
    // AWS profile name
    public profileName: string,
    // AWS access key ID
    public accessKeyId: string,
    // AWS secret access key
    public secretAccessKey: string,
    // Minecraft server region
    public region: string
  ) {}
}
