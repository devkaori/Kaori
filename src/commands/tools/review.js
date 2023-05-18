const Discord = require('discord.js');

const Schema = require("../../database/models/reviewChannels");

module.exports = async (client, interaction, args) => {
    const stars = interaction.options.getNumber('stars');
    const message = interaction.options.getString('message') || 'Non spécifié';

    if (stars < 1 || stars > 5) return client.errNormal({
        error: `Les étoiles doivent être comprises entre 1 et 5`,
        type: 'editreply'
    }, interaction)

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            const channel = interaction.member.guild.channels.cache.get(data.Channel);
            if (!channel) return  client.errNormal({
                error: `Aucun salon de critiques défini ! Utilisez \`reviewchannel\``,
                type: 'editreply'
            }, interaction);
            
            let totalStars = "";
            for (let i = 0; i < stars; i++) {
                totalStars += ":star:";
            }

            client.succNormal({
                text: "Votre critique a été soumise avec succès",
                fields: [
                    {
                        name: `Étoiles`,
                        value: `${stars}`,
                        inline: true
                    },
                    {
                        name: `Salon`,
                        value: `<#${data.Channel}>`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);

            client.embed({
                title: `Critique・${interaction.user.tag}`,
                desc: `Une nouvelle critique a été rédigée !`,
                fields: [
                    {
                        name: "Étoiles",
                        value: `${totalStars}`,
                        inline: true,
                    },
                    {
                        name: "Note",
                        value: `${message}`,
                        inline: true,
                    },
                ]
            }, channel)

        }
        else {
            client.errNormal({
                error: `Aucun salon de critiques défini ! Utilisez \`reviewchannel\``,
                type: 'editreply'
            }, interaction)
        }
    })
}