const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autosetup')
        .setDescription('Permet au bot de se configurer automatiquement')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de configuration automatique')
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
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('games')
                .setDescription('Définir les salons de jeux du serveur')
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
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcome')
                .setDescription('Configurer le système de bienvenue')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Salon de bienvenue', value: 'welcomechannel' },
                            { name: 'Rôle de bienvenue', value: 'welcomerole' },
                            { name: 'Salon de départ', value: 'leavechannel' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('customvoice')
                .setDescription('Définir les salons vocaux personnalisés du serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketpanel')
                .setDescription('Définir le panneau de tickets du serveur')
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
            flags: [Discord.PermissionsBitField.Flags.Administrator],
            perms: [Discord.PermissionsBitField.Flags.Administrator]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};
