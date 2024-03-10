import { log } from "@/log";
import { Client, Events, Interaction } from "discord.js";
import onceClientReady from "./listeners/onceClientReady";
import { EventMessage } from "@/classes/EventMessage";
import onMessageCreate from "./listeners/onMessageCreate";
import onThreadCreate from "./listeners/onThreadCreate";
import onThreadDelete from "./listeners/onThreadDelete";
import onInteractionCreate from "./listeners/onInteractionCreate";
import bot from "@/bot";
import everyMinute from "./listeners/everyMinute";

export function initDiscord() {
  log(new EventMessage("EVERY", null, null));
  setInterval(everyMinute, 60 * 1000); // Run every minute (60,000 milliseconds)

  bot.discord.once(Events.ClientReady, (readyClient: Client) => {
    log(
      new EventMessage(Events.ClientReady, readyClient.user?.tag, readyClient)
    );
    onceClientReady(readyClient);
  });

  bot.discord.on(Events.MessageCreate, async (message) => {
    log(new EventMessage(Events.ClientReady, null, message));
    onMessageCreate(message);
  });

  bot.discord.on(Events.ThreadCreate, async (thread) => {
    log(new EventMessage(Events.ThreadCreate, null, thread));
    onThreadCreate(thread);
  });

  bot.discord.on(Events.ThreadDelete, async (thread) => {
    log(new EventMessage(Events.ThreadCreate, null, thread));
    onThreadDelete(thread);
  });

  bot.discord.on(Events.InteractionCreate, async (interaction: Interaction) => {
    log(new EventMessage(Events.InteractionCreate, null, interaction));
    onInteractionCreate(interaction);
  });

  bot.discord.auth();
}
