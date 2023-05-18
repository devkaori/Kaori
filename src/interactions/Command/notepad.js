const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notepad')
        .setDescription('Gérez vos notes')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie "recherche"')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Ajouter une note à votre bloc-notes')
                .addStringOption(option => option.setName('note').setDescription('Votre note').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprimer une note de votre bloc-notes')
                .addStringOption(option => option.setName('id').setDescription('ID de la note').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Modifier une note de votre bloc-notes')
                .addStringOption(option => option.setName('id').setDescription('ID de la note').setRequired(true))
                .addStringOption(option => option.setName('note').setDescription('Nouvelle note').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('notes')
                .setDescription('Afficher toutes vos notes')
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