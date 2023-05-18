const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guild')
        .setDescription('Gérer la guilde')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie guilde')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channelinfo')
                .setDescription('Obtenir des informations sur un salon')
                .addChannelOption(option => option.setName('channel').setDescription('Sélectionnez un salon').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('members')
                .setDescription('Voir combien de membres il y a dans ce serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('oldestmember')
                .setDescription('Obtenir la date de création du compte la plus ancienne dans la guilde')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roleinfo')
                .setDescription('Obtenir des informations sur un rôle')
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Obtenir toutes les informations sur le serveur actuel')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stealemoji')
                .setDescription('Voler un emoji')
                .addStringOption(option => option.setName('emoji').setDescription('Entrez un emoji à voler').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('youngestmember')
                .setDescription('Obtenir la date de création du compte la plus récente dans la guilde')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('userinfo')
                .setDescription('Obtenir toutes les informations sur un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionnez un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('inviteinfo')
                .setDescription('Obtenir toutes les informations sur une invitation')
                .addStringOption(option => option.setName('invite').setDescription('Entrez un code d\'invitation').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emojis')
                .setDescription('Voir les emojis de la guilde')
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