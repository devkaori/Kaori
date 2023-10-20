const { CommandInteraction, Client, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`Obtenir de l'aide avec le bot`),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });

        const row = new MessageActionRow()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('Bot-helppanel')
                    .setPlaceholder('Rien de sélectionné')
                    .addOptions([
                        {
                            label: `Commandes`,
                            description: `Afficher les commandes du bot !`,
                            emoji: "1114167872646819961",
                            value: "commands-Bothelp",
                        },
                        {
                            label: `Invitation`,
                            description: `Inviter le bot sur votre serveur`,
                            emoji: "1114167747627208815",
                            value: "invite-Bothelp",
                        },
                        {
                            label: `Serveur de support`,
                            description: `Rejoindre le serveur de support`,
                            emoji: "1114167700999118878",
                            value: "support-Bothelp",
                        },
                    ]),
            );

        const imageEmbed = {
            image: {
                url: "https://i.imgur.com/FkGNk5Y.jpg",  // Remplacez par l'URL de votre image
            },
        };

        const helpEmbed = {
            title: `Panneau d'aide`,
            description: `Bienvenue dans le panneau d'aide du bot ! Nous avons préparé une petite présentation pour vous aider ! Faites un choix via le menu ci-dessous`,
            fields: [
                {
                    name: `Le menu ne fonctionne pas ?`,
                    value: `Essayez d'envoyer à nouveau la commande. Si vous n'obtenez aucune réaction, assurez-vous de signaler le bug !`
                },
                {
                    name: `Vous avez trouvé un bug ?`,
                    value: `Signalez-le avec \`/report bug\``
                },
            ],
        };

        await interaction.editReply({
            embeds: [imageEmbed, helpEmbed],
            components: [row]
        });
    },
};
