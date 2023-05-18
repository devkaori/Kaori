const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "Informations sur la radio",
        desc: "Toutes les informations sur la radio dans ce serveur",
        fields: [
            {
                name: "Auditeurs dans le salon",
                value: `${interaction.member.voice.channel.members.size} auditeurs`,
                inline: true
            },
            {
                name: "Salon connecté",
                value: `${interaction.member.voice.channel} (${interaction.member.voice.channel.name})`,
                inline: true
            },
            {
                name: "Station de radio",
                value: "[Radio 538](https://www.538.nl/)",
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction);
};