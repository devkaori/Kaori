const Discord = require('discord.js');

const Schema = require("../../database/models/invites");

module.exports = async (client, interaction, args) => {
    let user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            client.embed({
                title: "Invitations",
                desc: `**${user.username}** a \`${data.Invites}\` invitations`,
                fields: [
                    {
                        name: "Total",
                        value: `${data.Total}`,
                        inline: true
                    },
                    {
                        name: "Partis",
                        value: `${data.Left}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction)
        }
        else {
            client.embed({
                title: "Invitations",
                desc: `**${user.username}** n'a aucune invitation`,
                image: `https://i.imgur.com/IFqedKi.png`,
                fields: [
                    {
                        name: "Total",
                        value: `0`,
                        inline: true
                    },
                    {
                        name: "Membres Parti",
                        value: `0`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction)
        }
    });
}
