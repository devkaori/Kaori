const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionroles')
        .setDescription('Gérer les rôles par réaction sur le serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie des rôles par réaction')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Ajouter un rôle par réaction')
                .addStringOption(option => option.setName('category').setDescription('Nom de la catégorie pour votre groupe de rôles par réaction').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(true))
                .addStringOption(option => option.setName('emoji').setDescription('Entrez un emoji').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprimer une catégorie de rôles par réaction')
                .addStringOption(option => option.setName('category').setDescription('Nom de la catégorie pour votre groupe de rôles par réaction').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Afficher toutes les catégories de rôles par réaction de ce serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('button')
                .setDescription('Afficher tous les rôles par réaction avec des boutons')
                .addStringOption(option => option.setName('category').setDescription('Nom de la catégorie pour votre groupe de rôles par réaction').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Salon où les rôles par réaction doivent apparaître').addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('menu')
                .setDescription('Afficher tous les rôles par réaction dans un menu')
                .addStringOption(option => option.setName('category').setDescription('Nom de la catégorie pour votre groupe de rôles par réaction').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Salon où les rôles par réaction doivent apparaître').addChannelTypes(ChannelType.GuildText))
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
            flags: [Discord.PermissionsBitField.Flags.ManageRoles],
            perms: [Discord.PermissionsBitField.Flags.ManageRoles]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};