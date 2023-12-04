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
            image: 'https://i.imgur.com/1t1MXa3.jpg',
            desc: `Bienvenue dans le panneau d'aide du bot ! On a préparé une petite présentation pour te guider ! Choisis ce qui te branche dans le menu ci-dessous, et on part en aventure !`,
            fields: [
                {
                    name: `Hé, le menu fait des siennes ? <:mugi_ooo:1163106314726158426>`,
                    value: `<:mugi_happy:1163106301925142641> Pas de panique, on va régler ça ! Donne-nous un petit signe et on se charge de remettre tout sur pieds !`
                },
                {
                    name: `Hé, vous avez dégoté un petit bug par ici ? <:mugi_ooo:1163106314726158426>`,
                    value: `<a:mugi_pillow:1163075339405250571> Pas de souci, on va le chasser comme des pros ! [Signalez-le-nous](https://discord.gg/7S28GvPsZQ), et on s'occupe de le faire disparaître plus vite qu'un ninja dans l'ombre !`
                },
            ],
            components: [row],
            type: 'editreply'
        }, interaction)
    },
};
