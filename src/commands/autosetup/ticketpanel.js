const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");

module.exports = async (client, interaction, args) => {
    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, ticketData) => {
        if (ticketData) {
            const channel = interaction.guild.channels.cache.get(ticketData.Channel);
            const button = new Discord.ButtonBuilder()
                .setCustomId('Bot_openticket')
                .setLabel("Assistance")
                .setStyle(Discord.ButtonStyle.Danger)
                .setEmoji('1089244218033193022')
            const button2 = new Discord.ButtonBuilder()
                .setCustomId('Bot_openticket2')
                .setLabel("Autre Demande")
                .setStyle(Discord.ButtonStyle.Danger)
                .setEmoji('1089244188660486174')

            const row = new Discord.ActionRowBuilder()
                .addComponents(button, button2)

            client.embed({
                title: "Tickets",
                desc: "Contacter les responsables du serveur en cliquant sur l'un des boutons ci-dessus",
                components: [row]
            }, channel)

            client.succNormal({
                text: `Le panneau des tickets a été configuré avec succès !`,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `Exécutez d'abord la configuration des tickets !`,
                type: 'editreply'
            }, interaction);
        }
    })
}