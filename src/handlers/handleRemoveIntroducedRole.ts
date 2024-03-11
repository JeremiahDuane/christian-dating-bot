import bot from "@/bot";
import config from "@/config.json";
import { log } from "@/log";
import { AnyThreadChannel } from "discord.js";

async function handleRemovedIntroducedRole(
  thread: AnyThreadChannel<boolean>
): Promise<void> {
  const guild = thread.guild;
  const author = await guild.members.fetch(thread.ownerId);
  const introductions = await guild.channels.cache.find(
    (channel: any) => channel.name === config.channels.introductions
  );
  const roleIntroduced = guild.roles.cache.find(
    (role: any) => role.name.toLowerCase() === config.roles.introduced
  );
  const roleUnintroduced = guild.roles.cache.find(
    (role: any) => role.name.toLowerCase() === config.roles.unintroduced
  );

  if (
    introductions?.id === thread.parentId &&
    roleIntroduced &&
    roleUnintroduced
  ) {
    author.roles.add(roleUnintroduced);
    author.roles.remove(roleIntroduced);
    log("roleIntroduced swapped for roleUnintroduced");
  }
}

export { handleRemovedIntroducedRole };
