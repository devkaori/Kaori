const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
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
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('Bot-helppanel')
                    .setPlaceholder('Rien de sélectionné')
                    .addOptions([
                        {
                            label: `Commandes`,
                            description: `Afficher les commandes du bot !`,
                            emoji: "💻",
                            value: "commands-Bothelp",
                        },
                        {
                            label: `Invitation`,
                            description: `Inviter le bot sur votre serveur`,
                            emoji: "📨",
                            value: "invite-Bothelp",
                        },
                        {
                            label: `Serveur de support`,
                            description: `Rejoindre le serveur de support`,
                            emoji: "❓",
                            value: "support-Bothelp",
                        },
                        {
                            label: `Changements`,
                            description: `Afficher les changements du bot`,
                            emoji: "📃",
                            value: "changelogs-Bothelp",
                        },
                    ]),
            );

        return client.embed({
            title: `Panneau d'aide`,
            desc: `Bienvenue dans le panneau d'aide du bot ! Nous avons préparé une petite présentation pour vous aider ! Faites un choix via le menu ci-dessous`,
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
            components: [row],
            type: 'editreply'
        }, interaction)
    },
};