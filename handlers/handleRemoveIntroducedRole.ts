import config from '@/config.json';
import { log } from '@/log';

async function handleRemovedIntroducedRole(thread: any): Promise<void> {
    const guild = thread.guild;
    const author = await guild.members.fetch(thread.ownerId);
    const introductions = await guild.channels.cache.find((channel: any) => channel.name === config.channels.introductions);
    const roleIntroduced = guild.roles.cache.find((role: any) => role.id === config.roles.introduced);
    const roleUnintroduced = guild.roles.cache.find((role: any) => role.id === config.roles.unintroduced);

    if (introductions?.id === thread.parentId && roleIntroduced && roleUnintroduced) {
        author.roles.add(roleUnintroduced);
        author.roles.remove(roleIntroduced);
        log("roleIntroduced swapped for roleUnintroduced");
    }
}

export { handleRemovedIntroducedRole };
