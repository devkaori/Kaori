const discord = require('discord.js');

module.exports = async (client, sticker) => {
    const logsChannel = await client.getLogs(sticker.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Sticker supprimé`,
        desc: `Un sticker a été supprimé`,
        fields: [
            {
                name: `> Nom`,
                value: `- ${sticker.name}`
            },
            {
                name: `> ID`,
                value: `- ${sticker.id}`
            }
        ]
    }, logsChannel).catch(() => {});
};