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
        title: `Thread supprimé`,
        desc: `Un fil a été supprimé`,
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
                name: `Type`,
                value: `${types[channel.type]}`
            }
        ]
    }, logsChannel).catch(() => {});
};
