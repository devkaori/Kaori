const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderation')
        .setDescription('Gérer la modération du serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie "modération"')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Bannir un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison du bannissement'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Supprimer des messages')
                .addNumberOption(option => option.setName('amount').setDescription('Nombre de messages').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clearuser')
                .setDescription('Supprimer les messages d\'un utilisateur dans un salon')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('demote')
                .setDescription('Rétrograder un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('kick')
                .setDescription('Expulser un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison de l\'expulsion'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lock')
                .setDescription('Verrouiller un salon')
                .addChannelOption(option => option.setName('channel').setDescription('Sélectionner un salon').addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lockdown')
                .setDescription('Verrouiller tous les salons')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('nuke')
                .setDescription('Effacer un salon')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('softban')
                .setDescription('Bannir temporairement un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison du bannissement'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('timeout')
                .setDescription('Mettre un utilisateur en mode timeout')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('time').setDescription('Nombre de minutes').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('Raison du timeout').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tempban')
                .setDescription('Bannir temporairement un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('time').setDescription('Nombre de minutes').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison du bannissement'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unlock')
                .setDescription('Déverrouiller un salon')
                .addChannelOption(option => option.setName('channel').setDescription('Sélectionner un salon').addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unban')
                .setDescription('Débannir un utilisateur')
                .addStringOption(option => option.setName('user').setDescription('Donner l\'ID d\'un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('banlist')
                .setDescription('Obtenir la liste des utilisateurs bannis')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('warn')
                .setDescription('Avertir un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison de l\'avertissement').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unwarn')
                .setDescription('Supprimer un avertissement à un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addIntegerOption(option => option.setName('case').setDescription('Donner un numéro de cas').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('warnings')
                .setDescription('Voir les avertissements d\'un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
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