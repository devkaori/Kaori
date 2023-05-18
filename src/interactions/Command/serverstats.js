const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverstats')
        .setDescription('Gérer les statistiques du serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie de statistiques du serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('boosts')
                .setDescription('Suivre le nombre de boosts')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tier')
                .setDescription('Suivre le nombre de boosts de chaque niveau')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channels')
                .setDescription('Suivre le nombre de canaux')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stage-channels')
                .setDescription('Suivre le nombre de salons de discussion')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('text-channels')
                .setDescription('Suivre le nombre de salons textuels')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('voice-channels')
                .setDescription('Suivre le nombre de salons vocaux')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('news-channels')
                .setDescription('Suivre le nombre de salons d\'actualités')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('members')
                .setDescription('Suivre le nombre de membres')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bots')
                .setDescription('Suivre le nombre de bots')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roles')
                .setDescription('Suivre le nombre de rôles')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emoji')
                .setDescription('Suivre le nombre d\'emojis')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('static-emoji')
                .setDescription('Suivre le nombre d\'emojis statiques')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('animated-emoji')
                .setDescription('Suivre le nombre d\'emojis animés')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('time')
                .setDescription('Suivre votre fuseau horaire actuel')
                .addStringOption(option =>
                    option.setName('timezone')
                        .setDescription('Le fuseau horaire que vous souhaitez définir (par exemple Europe/Amsterdam)')
                        .setRequired(true)
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
        const perms = await client.checkPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageChannels],
            perms: [Discord.PermissionsBitField.Flags.ManageChannels]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};