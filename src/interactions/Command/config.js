const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Ajuster le bot à vos préférences')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie de configuration')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('levels')
                .setDescription('Activer/désactiver les niveaux')
                .addBooleanOption(option => option.setName('boolean').setDescription('Sélectionnez un booléen').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setcolor')
                .setDescription('Définir une couleur personnalisée pour les messages intégrés')
                .addStringOption(option => option.setName("color").setDescription("Entrez une couleur hexadécimale").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setverify')
                .setDescription('Configurer le panneau de vérification')
                .addBooleanOption(option => option.setName('enable').setDescription('Sélectionnez un booléen').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Sélectionnez un canal').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setchannelname')
                .setDescription('Définir un nom de canal personnalisé pour les statistiques du serveur')
                .addStringOption(option => option.setName("name").setDescription("Entrez un nom pour le canal ou envoyez HELP pour les arguments").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('levelmessage')
                .setDescription('Définir le message de niveau du bot')
                .addStringOption(option => option.setName("message").setDescription("Entrez un message pour les niveaux ou envoyez HELP pour les arguments").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomemessage')
                .setDescription('Définir le message de bienvenue')
                .addStringOption(option => option.setName("message").setDescription("Entrez un message de bienvenue ou envoyez HELP pour les arguments").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leavemessage')
                .setDescription('Définir le message de départ')
                .addStringOption(option => option.setName("message").setDescription("Entrez un message de départ ou envoyez HELP pour les arguments").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketmessage')
                .setDescription('Définir le message des tickets du bot')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Type de message de ticket')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ouverture', value: 'open' },
                            { name: 'fermeture DM', value: 'close' }
                        )
                )
                .addStringOption(option => option.setName("message").setDescription("Entrez un message pour le ticket").setRequired(true))
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