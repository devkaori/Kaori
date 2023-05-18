const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");

module.exports = async (client, interaction, args) => {
    const name = interaction.options.getString('name');
    const description = interaction.options.getString('description');

    // Recherche des données du ticket dans la base de données
    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, ticketData) => {
        if (ticketData) {
            // Récupération du canal de la base de données
            const channel = interaction.guild.channels.cache.get(ticketData.Channel);

            // Création du bouton
            const button = new Discord.ButtonBuilder()
                .setCustomId('Bot_openticket')
                .setLabel(name)
                .setStyle(Discord.ButtonStyle.Primary)
                .setEmoji('🎫')

            // Création de la rangée d'actions
            const row = new Discord.ActionRowBuilder()
                .addComponents(button)

            // Envoi du message embed dans le canal
            client.embed({
                title: name,
                desc: description,
                components: [row]
            }, channel)

            // Réponse de succès à l'interaction
            client.succNormal({
                text: `Le panneau de ticket a été configuré avec succès !`,
                type: 'editreply'
            }, interaction);
        }
        else {
            // Réponse d'erreur si la configuration du ticket n'a pas été effectuée
            client.errNormal({
                error: `Veuillez d'abord exécuter la configuration du ticket !`,
                type: 'editreply'
            }, interaction);
        }
    })
}
