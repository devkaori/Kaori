const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invites')
        .setDescription('Afficher le système d\'invitations')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie invitations')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Ajouter des invitations à un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Entrer un nombre d\'invitations').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Supprimer des invitations à un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Entrer un nombre d\'invitations').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('show')
                .setDescription('Voir vos invitations')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Voir le classement des invitations')
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
