const discord = require('discord.js');

module.exports = async (client, oldEvent, newEvent) => {
    const logsChannel = await client.getLogs(newEvent.guildId);
    if (!logsChannel) return;

    client.embed({
        title: `Événement mis à jour`,
        desc: `Un événement a été mis à jour`,
        fields: [
            {
                name: `Ancien nom`,
                value: `${oldEvent.name}`
            },
            {
                name: `Nouveau nom`,
                value: `${newEvent.name}`
            },
            {
                name: `Ancienne description`,
                value: `${oldEvent.description || 'Aucune'}`
            },
            {
                name: `Nouvelle description`,
                value: `${newEvent.description || 'Aucune'}`
            },
            {
                name: `Ancienne heure`,
                value: `<t:${(oldEvent.scheduledStartTimestamp / 1000).toFixed(0)}>`
            },
            {
                name: `Nouvelle heure`,
                value: `<t:${(newEvent.scheduledStartTimestamp / 1000).toFixed(0)}>`
            },
            {
                name: `Créateur`,
                value: `<@!${newEvent.creatorId}> (${newEvent.creatorId})`
            },
            {
                name: `> Horodatage`,
                value: `- <t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};
