const discord = require('discord.js');

const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, channel) => {
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
    title: `Suppression de salon`,
    desc: `Un salon a été supprimé`,
    fields: [
        {
            name: `> Nom`,
            value: `- ${channel.name}`
        },
        {
            name: `> ID`,
            value: `- ${channel.id}`
        },
        {
            name: `> Catégorie`,
            value: `- ${channel.parent}`
        },
        {
            name: `> Type`,
            value: `- ${types[channel.type]}`
        }
    ]
}, logsChannel).catch(() => { })

try {
    ticketChannels.findOne({ Guild: channel.guild.id, channelID: channel.id }, async (err, data) => {
        if (data) {
            var remove = await ticketChannels.deleteOne({ Guild: channel.guild.id, channelID: channel.id });
        }
    })
}
catch { }
};