const Discord = require('discord.js');
const ticketSchema = require("../../database/models/tickets");

module.exports = async (client, interaction, args) => {
    const name = interaction.options.getString('name');
    const description = interaction.options.getString('description');
    const option1 = interaction.options.getString('option1');
    const option2 = interaction.options.getString('option2');
    const option3 = interaction.options.getString('option3');

    // Recherche des données du ticket dans la base de données
    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, ticketData) => {
        if (ticketData) {
            // Récupération du canal de la base de données
            const channel = interaction.guild.channels.cache.get(ticketData.Channel);

            // Création des boutons
            const components = [];

            const button1 = new Discord.ButtonBuilder()
                .setCustomId('Bot_openticket1')
                .setLabel(option1 || 'Option 1')
                .setStyle(Discord.ButtonStyle.Primary)
                .setEmoji('<:Tickets:1189624711974498325>');
            components.push(button1);

            if (option2) {
                const button2 = new Discord.ButtonBuilder()
                    .setCustomId('Bot_openticket2')
                    .setLabel(option2)
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setEmoji('<:Tickets:1189624711974498325>');
                components.push(button2);
            }

            if (option3) {
                const button3 = new Discord.ButtonBuilder()
                    .setCustomId('Bot_openticket3')
                    .setLabel(option3)
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setEmoji('<:Tickets:1189624711974498325>');
                components.push(button3);
            }

            // Création de la rangée d'actions
            const row = new Discord.ActionRowBuilder()
                .addComponents(...components);

            // Envoi du message embed dans le canal
            client.embed({
                title: name,
                desc: description,
                image: `https://i.imgur.com/PkNmeFx.png`,
                components: [row]
            }, channel);

            // Réponse de succès à l'interaction
            client.succNormal({
                text: `Le panneau de ticket a été configuré avec succès !`,
                type: 'editreply'
            }, interaction);
        } else {
            // Réponse d'erreur si la configuration du ticket n'a pas été effectuée
            client.errNormal({
                error: `Veuillez d'abord exécuter la configuration du ticket !`,
                type: 'editreply'
            }, interaction);
        }
    });
};
