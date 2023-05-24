const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Gérer les configurations du bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie de configuration')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tickets')
                .setDescription('Configurer les tickets')
                .addChannelOption(option => option.setName('category').setDescription('Sélectionner une catégorie où les tickets doivent être créés').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
                .addRoleOption(option => option.setName('role').setDescription('Sélectionner le rôle de support').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Le salon pour le panneau des tickets').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addChannelOption(option => option.setName('logs').setDescription('Le salon pour les logs des tickets').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('customvoice')
                .setDescription('Configurer les salons vocaux personnalisés')
                .addChannelOption(option => option.setName('category').setDescription('Sélectionner une catégorie où les salons doivent être créés').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
                .addStringOption(option => option.setName('channelname').setDescription('Le modèle des noms de salons').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('logs')
                .setDescription('Configurer les logs du serveur')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Logs du serveur', value: 'serverLogs' },
                            { name: 'Logs de niveau', value: 'levelLogs' },
                            { name: 'Logs de boosts', value: 'boostLogs' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Le salon pour les logs').setRequired(true).addChannelTypes(ChannelType.GuildText))
        .addSubcommand(subcommand =>
            subcommand
                .setName('games')
                .setDescription('Configurer les salons de jeux du serveur')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Comptage', value: 'counting' },
                            { name: 'Devinez le nombre', value: 'gtn' },
                            { name: 'Devinez le mot', value: 'gtw' },
                            { name: 'Word snake', value: 'wordsnake' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Le salon pour le jeu').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomechannels')
                .setDescription('Configurer les salons de bienvenue')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Salon de bienvenue', value: 'welcomechannel' },
                            { name: 'Salon de départ', value: 'leavechannel' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Le salon que vous souhaitez').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomerole')
                .setDescription('Configurer le rôle de bienvenue')
                .addRoleOption(option => option.setName('role').setDescription('Le rôle que vous souhaitez').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketpanel')
                .setDescription('Configurer le panneau des tickets')
                .addStringOption(option => option.setName('name').setDescription('Le nom du panneau des tickets').setRequired(true))
                .addStringOption(option => option.setName('description').setDescription('La description du panneau des tickets').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deletesetup')
                .setDescription('Supprimer une configuration du bot')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Tickets', value: 'tickets' },
                            { name: 'Salons vocaux personnalisés', value: 'customvoice' },
                            { name: 'Logs du serveur', value: 'serverlogs' },
                            { name: 'Logs de niveau', value: 'levellogs' },
                            { name: 'Logs de boosts', value: 'boostlogs' },
                            { name: 'Anniversaires', value: 'birthdays' },
                            { name: 'Chatbot', value: 'chatbot' },
                            { name: 'Avis', value: 'reviews' },
                            { name: 'Suggestions', value: 'suggestions' },
                            { name: 'Comptage', value: 'counting' },
                            { name: 'Devinez le nombre', value: 'gtn' },
                            { name: 'Devinez le mot', value: 'gtw' },
                            { name: 'Salon de bienvenue', value: 'welcomechannel' },
                            { name: 'Salon de départ', value: 'leavechannel' },
                            { name: 'Rôle de bienvenue', value: 'welcomerole' },
                            { name: 'Word snake', value: 'wordsnake' }
                        )
                )
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.Administrator],
            perms: [Discord.PermissionsBitField.Flags.Administrator]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};
