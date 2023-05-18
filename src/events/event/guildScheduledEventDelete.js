const discord = require('discord.js');

module.exports = async (client, event) => {
    let types = {
        GUILD_ONLY: "Uniquement sur le serveur",
        PUBLIC: "Public",
    }

    let locations = {
        NONE: "Aucun",
        STAGE_INSTANCE: "Salon de scène",
        VOICE: "Salon vocal",
        EXTERNAL: `Externe`
    }

    const logsChannel = await client.getLogs(event.guildId);
    if (!logsChannel) return;

    client.embed({
        title: `Événement supprimé`,
        desc: `Un événement a été supprimé`,
        fields: [
            {
                name: `> Nom`,
                value: `- ${event.name}`
            },
            {
                name: `> Description`,
                value: `- ${event.description || 'Aucune'}`
            },
            {
                name: `> Début`,
                value: `- <t:${(event.scheduledStartTimestamp / 1000).toFixed(0)}>`
            },
            {
                name: `> Confidentialité`,
                value: `- ${types[event.privacyLevel]}`
            },
            {
                name: `> Créateur`,
                value: `- <@!${event.creatorId}> (${event.creatorId})`
            },
            {
                name: `> Type de lieu`,
                value: `- ${locations[event.entityType]}`
            },
            {
                name: `> Horodatage`,
                value: `- <t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};