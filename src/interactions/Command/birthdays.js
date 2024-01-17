const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthdays')
        .setDescription('Afficher ou enregistrer un anniversaire')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie des anniversaires')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Vérifier votre anniversaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprimer votre anniversaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Afficher tous les anniversaires')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Définir votre anniversaire')
                .addNumberOption(option => option.setName('jour').setDescription('Le numéro du jour de votre anniversaire').setRequired(true))
                .addNumberOption(option => option.setName('mois').setDescription('Le numéro du mois de votre anniversaire').setRequired(true))
        )
    ,

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
