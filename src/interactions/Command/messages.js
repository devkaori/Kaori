const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('messages')
        .setDescription('Afficher le système de messages')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie "messages"')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Ajouter des messages à un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Entrer une quantité de messages').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deletereward')
                .setDescription('Supprimer une récompense de messages')
                .addNumberOption(option => option.setName('amount').setDescription('Entrer une quantité de messages').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('createreward')
                .setDescription('Créer une récompense de messages')
                .addNumberOption(option => option.setName('amount').setDescription('Entrer une quantité de messages').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Le rôle pour cette récompense').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Supprimer des messages à un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Entrer une quantité de messages').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('show')
                .setDescription('Voir vos messages')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rewards')
                .setDescription('Afficher toutes les récompenses de messages')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Voir le classement des messages')
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