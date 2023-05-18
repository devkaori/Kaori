const Discord = require('discord.js');

module.exports = async (client, guild, oldLevel, newLevel) => {
    const logsChannel = await client.getLogs(guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Nouveau niveau de boost`,
        desc: `Ce serveur est passé à un nouveau niveau de boost`,
        fields: [
            {
                name: `> Ancien niveau`,
                value: `- ${oldLevel}`
            },
            {
                name: `> Nouveau niveau`,
                value: `- ${newLevel}`
            },
            {
                name: `> Horodatage`,
                value: `- <t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};