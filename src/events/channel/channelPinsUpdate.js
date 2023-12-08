const discord = require('discord.js');

module.exports = async (client, channel, time) => {
    let types = {
        0: "Salon texte",
        2: "Salon vocal",
        4: "Catégorie",
        5: "Salon d'actualités",
        10: "Thread d'actualités",
        11: "Thread public",
        12: "Thread privé",
        13: "Salon de scène",
        14: "Catégorie",
    }

    const logsChannel = await client.getLogs(channel.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Épingles du salon mises à jour`,
        desc: `Les épingles du salon ont été mises à jour`,
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
                name: `Salon`,
                value: `<#${channel.id}>`
            },
            {
                name: `Type`,
                value: `${types[channel.type]}`
            },
            {
                name: `Épinglé à`,
                value: `<t:${(time / 1000).toFixed(0)}>`
            }
        ]
    }, logsChannel).catch(() => { })
};
