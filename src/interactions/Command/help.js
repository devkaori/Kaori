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
                            emoji: "1163106294073401354",
                            value: "commands-Bothelp",
                        },
                        {
                            label: `Invitation`,
                            description: `Inviter le bot sur votre serveur`,
                            emoji: "1163106292227915796",
                            value: "invite-Bothelp",
                        },
                        {
                            label: `Serveur de support`,
                            description: `Rejoindre le serveur de support`,
                            emoji: "1163106279187820544",
                            value: "support-Bothelp",
                        },
                    ]),
            );

        return client.embed({
            title: `Panneau d'aide`,
            desc: `Bienvenue dans le panneau d'aide du bot ! Nous avons préparé une petite présentation pour vous aider ! Faites un choix via le menu ci-dessous`,
            fields: [
                {
                    name: `<:white_heart:1130912421213646908> Le menu ne fonctionne pas ?`,
                    value: `Essayez d'envoyer à nouveau la commande. Si vous n'obtenez aucune réaction, assurez-vous de signaler le bug !`
                },
                {
                    name: `<a:8a_exclamation:1163192046392189059> Vous avez trouvé un bug ?`,
                    value: `Signalez-le [nous](https://discord.gg/7S28GvPsZQ)`
                },
            ],
            components: [row],
            type: 'editreply'
        }, interaction)
    },
};
