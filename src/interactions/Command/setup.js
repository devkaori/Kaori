import { CommandInteraction, Client, ChannelType } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Gérer les configurations du bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription("Obtenir des informations sur les commandes de la catégorie 'setup'")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tickets')
                .setDescription('Configurer les tickets')
                .addChannelOption(option => option.setName('category').setDescription('Sélectionnez une catégorie pour les tickets').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez le rôle de support').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Le canal pour le panneau des tickets').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addChannelOption(option => option.setName('logs').setDescription('Le canal pour les journaux des tickets').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('customvoice')
                .setDescription('Configurer les canaux vocaux personnalisés')
                .addChannelOption(option => option.setName('category').setDescription('Sélectionnez une catégorie pour les canaux').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
                .addStringOption(option => option.setName('channelname').setDescription('Le modèle pour les noms de canaux').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('logs')
                .setDescription('Définir les journaux du serveur')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Journaux du serveur', value: 'serverLogs' },
                            { name: 'Journaux de niveau', value: 'levelLogs' },
                            { name: 'Journaux de boost', value: 'boostLogs' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Le canal pour les journaux').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fun')
                .setDescription('Définir les canaux de divertissement du serveur')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Anniversaires', value: 'birthdays' },
                            { name: 'Chatbot', value: 'chatbot' },
                            { name: 'Avis', value: 'reviews' },
                            { name: 'Suggestions', value: 'suggestions' },
                            { name: 'Starboard', value: 'starboard' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Le canal pour le divertissement').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('games')
                .setDescription('Définir les canaux de jeu du serveur')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Comptage', value: 'counting' },
                            { name: 'Devine le nombre', value: 'gtn' },
                            { name: 'Devine le mot', value: 'gtw' },
                            { name: 'Serpent de mots', value: 'wordsnake' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Le canal pour le jeu').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomechannels')
                .setDescription('Configurer les canaux de bienvenue')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Canal de bienvenue', value: 'welcomechannel' },
                            { name: 'Canal de départ', value: 'leavechannel' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Le canal que vous souhaitez').setRequired(true).addChannelTypes(ChannelType.GuildText))
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
                            { name: 'Canaux vocaux personnalisés', value: 'customvoice' },
                            { name: 'Journaux du serveur', value: 'serverlogs' },
                            { name: 'Journaux de niveau', value: 'levellogs' },
                            { name: 'Journaux de boost', value: 'boostlogs' },
                            { name: 'Anniversaires', value: 'birthdays' },
                            { name: 'Chatbot', value: 'chatbot' },
                            { name: 'Avis', value: 'reviews' },
                            { name: 'Suggestions', value: 'suggestions' },
                            { name: 'Comptage', value: 'counting' },
                            { name: 'Devine le nombre', value: 'gtn' },
                            { name: 'Devine le mot', value: 'gtw' },
                            { name: 'Canal de bienvenue', value: 'welcomechannel' },
                            { name: 'Canal de départ', value: 'leavechannel' },
                            { name: 'Rôle de bienvenue', value: 'welcomerole' },
                            { name: 'Serpent de mots', value: 'wordsnake' }
                        )
                )
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const perms = await client.checkUserPerms({
            flags: [Discord.Permissions.FLAGS.ADMINISTRATOR],
            perms: [Discord.Permissions.FLAGS.ADMINISTRATOR]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};
