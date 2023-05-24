const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Informations sur le bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie du bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Obtenir des informations sur le bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ping')
                .setDescription('Voir la latence du bot en ms')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('links')
                .setDescription('Obtenir un message avec tous les liens du bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('owner')
                .setDescription('Obtenir des informations sur le propriétaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('support')
                .setDescription('Obtenir une invitation vers le serveur de support')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('uptime')
                .setDescription(`Afficher le temps d'activité du bot`)
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('vote')
                .setDescription('Voir si vous avez voté')
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};
