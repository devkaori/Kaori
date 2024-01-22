const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`Obtenir de l'aide avec le bot`),

    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const menu = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('Bot-helppanel')
                    .setPlaceholder('Rien de sélectionné')
                    .addOptions([
                        { label: `Commandes`, description: `Afficher les commandes du bot`, emoji: "1163106294073401354", value: "commands-Bothelp" },
                        { label: `Invitation`, description: `Inviter le bot sur votre serveur`, emoji: "1163106292227915796", value: "invite-Bothelp" },
                        { label: `Communauté`, description: `Rejoindre le serveur de support`, emoji: "1163106279187820544", value: "support-Bothelp" },
                    ]),
            );

        return client.embed({
            title: `Aide du Bot`,
            image: 'https://i.imgur.com/cNHAdGT.png',
            desc: `Bienvenue ! Choisissez une option dans le menu pour obtenir de l'aide.`,
            fields: [
                { name: `Problèmes avec le menu ?`, value: `Signalez-le, et nous réglerons cela rapidement !` },
                { name: `Bug repéré ?`, value: `[Signalez-le ici](https://discord.gg/7S28GvPsZQ) pour une résolution rapide !` },
            ],
            components: [menu],
            type: 'editreply',
            ephemeral: true
        }, interaction);
    },
};
