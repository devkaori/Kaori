const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const Schema = require("../../database/models/functions");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('levels')
        .setDescription('Afficher le système de niveaux')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie "levels"')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setlevel')
                .setDescription('Définir un nouveau niveau pour un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('level').setDescription('Entrer un nouveau niveau').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deletereward')
                .setDescription('Supprimer une récompense de niveau')
                .addNumberOption(option => option.setName('level').setDescription('Entrer un niveau').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('createreward')
                .setDescription('Créer une récompense de niveau')
                .addNumberOption(option => option.setName('level').setDescription('Entrer un niveau').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Le rôle pour cette récompense').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setxp')
                .setDescription('Définir un nouvel XP pour un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Entrer une quantité d\'XP').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rank')
                .setDescription('Voir votre classement actuel')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rewards')
                .setDescription('Afficher toutes les récompenses de niveau')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Voir le classement des niveaux')
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const guild = await Schema.findOne({ Guild: interaction.guild.id });
        if (!guild.Levels) return client.errNormal({
            error: `Le système de niveaux est désactivé !`,
            type: 'ephemeral'
        }, interaction);

        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};