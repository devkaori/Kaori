const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `Informations sur le propriétaire`,
        desc: `Informations sur la créatrice du bot`,
        image: `https://i.imgur.com/IFqedKi.png`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "Nom du propriétaire",
            value: `Masha`,
            inline: true,
        },
        {
            name: "Tag Discord",
            value: `Masha#0001`,
            inline: true,
        },

        {
            name: "Site Web",
            value: `[kaoricafe.fr](https://kaoricafe.fr)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}