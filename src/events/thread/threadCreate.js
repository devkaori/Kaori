const discord = require('discord.js');

module.exports = async (client, channel) => {
    let types = {
        10: "Fil d'actualité",
        11: "Fil public",
        12: "Fil privé",
    }

    const logsChannel = await client.getLogs(channel.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Thread créé`,
        desc: `Un fil a été créé`,
        fields: [
            {
                name: `Nom`,
                value: `${channel.name}`
            },
            {
                name: `ID`,
                value: `${channel.id}`
            },
            {
                name: `Catégorie`,
                value: `${channel.parent}`
            },
            {
                name: `Canal`,
                value: `<#${channel.id}>`
            },
            {
                name: `Type`,
                value: `${types[channel.type]}`
            }
        ]
    }, logsChannel).catch(() => {});
};
