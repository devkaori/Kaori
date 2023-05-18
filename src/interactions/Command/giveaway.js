const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Organiser un concours sur votre serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie concours')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Démarrer un concours')
                .addChannelOption(option => option.setName('channel').setDescription('Le salon où le concours doit avoir lieu').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement))
                .addStringOption(option => option.setName('duration').setDescription('Durée du concours').setRequired(true))
                .addNumberOption(option => option.setName('winners').setDescription('Le nombre de gagnants du concours').setRequired(true))
                .addStringOption(option => option.setName('prize').setDescription('Le prix du concours').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('drop')
                .setDescription('Démarrer un concours de type "drop"')
                .addChannelOption(option => option.setName('channel').setDescription('Le salon où le concours doit avoir lieu').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement))
                .addStringOption(option => option.setName('duration').setDescription('Durée du concours').setRequired(true))
                .addNumberOption(option => option.setName('winners').setDescription('Le nombre de gagnants du concours').setRequired(true))
                .addStringOption(option => option.setName('prize').setDescription('Le prix du concours').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('reroll')
                .setDescription('Relancer un concours')
                .addStringOption(option => option.setName('message').setDescription('ID du message du concours').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('end')
                .setDescription('Terminer un concours')
                .addStringOption(option => option.setName('message').setDescription('ID du message du concours').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Modifier la durée d\'un concours')
                .addStringOption(option => option.setName('message').setDescription('ID du message du concours').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprimer un concours')
                .addStringOption(option => option.setName('message').setDescription('ID du message du concours').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Mettre en pause un concours')
                .addStringOption(option => option.setName('message').setDescription('ID du message du concours').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unpause')
                .setDescription('Reprendre un concours')
                .addStringOption(option => option.setName('message').setDescription('ID du message du concours').setRequired(true)),
        ),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};
