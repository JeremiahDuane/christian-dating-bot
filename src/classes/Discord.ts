import { Client, ClientOptions, Collection, Guild } from "discord.js";
import { DiscordCommandType } from "@/types/discord";
import { DiscordLoginOptions } from "@/types/bot";

export class DiscordClient extends Client<boolean> {
  commands: Collection<string, DiscordCommandType>;
  loginOptions: DiscordLoginOptions;
  guild: () => Guild;
  auth: () => Promise<string>;
  constructor(
    options?: ClientOptions,
    loginOptions?: DiscordLoginOptions,
    commands?: Collection<string, DiscordCommandType>,
    guild?: string
  ) {
    super(options);

    this.auth = async () => this.login(loginOptions?.token);
    this.guild = () => this.guilds.cache.get(guild);

    if (commands) this.commands = commands;
    else this.commands = new Collection();

    if (loginOptions) this.loginOptions = loginOptions;
    else this.loginOptions = loginOptions;
  }
}
