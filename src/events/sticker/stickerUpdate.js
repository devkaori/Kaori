const discord = require('discord.js');

module.exports = async (client, oldSticker, newSticker) => {
    const logsChannel = await client.getLogs(newSticker.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Sticker mis à jour`,
        desc: `Un sticker a été mis à jour`,
        fields: [
            {
                name: `> Avant`,
                value: `- ${oldSticker.name}`
            },
            {
                name: `> Après`,
                value: `- ${newSticker.name}`
            },
            {
                name: `> ID`,
                value: `- ${newSticker.id}`
            }
        ]
    }, logsChannel).catch(() => {});
};