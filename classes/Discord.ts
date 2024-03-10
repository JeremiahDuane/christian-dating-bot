import { Client, ClientOptions, Collection } from 'discord.js';
import { DiscordCommandType } from '@/types/discord';
import { DiscordLoginOptions } from '@/types/bot';

export class DiscordClient extends Client<boolean> {
    commands: Collection<string, DiscordCommandType>; 
    loginOptions: DiscordLoginOptions; 
    auth: () => Promise<string>;
    constructor(options?: ClientOptions, loginOptions?: DiscordLoginOptions ,commands?: Collection<string, DiscordCommandType>) {
        super(options);
        this.auth = async() => this.login(loginOptions?.token)

        if (commands) this.commands = commands
        else this.commands = new Collection();

        if (loginOptions) this.loginOptions = loginOptions
        else this.loginOptions = loginOptions;
    }
}