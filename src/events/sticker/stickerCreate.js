const Discord = require('discord.js');

module.exports = async (client, sticker) => {
    const logsChannel = await client.getLogs(sticker.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Sticker créé`,
        desc: `Un sticker a été créé`,
        fields: [
            {
                name: `Nom`,
                value: `${sticker.name}`
            },
            {
                name: `ID`,
                value: `${sticker.id}`
            },
            {
                name: `URL`,
                value: `${sticker.url}`
            }
        ]
    }, logsChannel).catch(() => {});
};
