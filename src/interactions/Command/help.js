const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`Accéder à la page d'aide`),

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
                    .setPlaceholder('Faites une sélection')
                    .addOptions([
                        {
                            label: `Commandes`,
                            description: `Afficher les commandes`,
                            emoji: "1229052811204100196",
                            value: "commands-Bothelp",
                        },
                        {
                            label: `Invitation`,
                            description: `Invite moi`,
                            emoji: "1229052863460937829",
                            value: "invite-Bothelp",
                        },
                        {
                            label: `Communauté`,
                            description: `Rajoin la communauté`,
                            emoji: "1229052874944811098",
                            value: "support-Bothelp",
                        },
                    ]),
            );

        return client.embed({
            image: `https://i.imgur.com/U9Fih4D.png`,
            desc: `Bonjour, je suis Kaori, votre nouvelle assistante pour la communauté. Ravi de faire votre connaissance. Ci-dessous, vous trouverez des boutons qui vous guideront pour la suite.`,
            fields: [
                {
                    name: 'ıllı Fonctionnalités',
                    value: '`Modération`, `Notifications`, `Auto-modération`, `Utilitaire`, `Giveaways` `Tickets`, `Anniversaire`, `Famille`, `Casino`, `Economies`, `Rôles`, '
                },
                {
                    name: '⩇ Vous avez trouvé un bug ?',
                    value: '⇆ [Contactez-nous](https://discord.gg/amies), on s\'en occupe'
                },
            ],
            content: `[Contactez-nous](https://discord.gg/7S28GvPsZQ ) si vous avez besoin`,
            components: [row],
            type: 'editreply'
        }, interaction)
    },
};
