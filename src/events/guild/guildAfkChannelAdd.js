const Discord = require('discord.js');

module.exports = async (client, guild, afkChannel) => {
    const logsChannel = await client.getLogs(guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Nouveau salon AFK`,
        desc: `Un salon AFK a été ajouté au serveur`,
        fields: [
            {
                name: `> Salon`,
                value: `- ${afkChannel}`
            },
            {
                name: `> Nom`,
                value: `- ${afkChannel.name}`
            },
            {
                name: `> ID`,
                value: `- ${afkChannel.id}`
            },
            {
                name: `> Horodatage`,
                value: `- <t:${Math.floor(afkChannel.createdTimestamp / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};