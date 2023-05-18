const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder, ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('annonce')
        .setDescription('Gérer les annonces du serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie "annonce"')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Faire une annonce')
                .addChannelOption(option => option.setName('channel').setDescription('Sélectionner un salon').setRequired(true).addChannelTypes(ChannelType.GuildText).addChannelTypes(ChannelType.GuildNews))
                .addStringOption(option => option.setName('message').setDescription('Votre message d\'annonce').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Modifier une annonce')
                .addStringOption(option => option.setName('id').setDescription('ID de l\'annonce que vous souhaitez modifier').setRequired(true))
                .addStringOption(option => option.setName('message').setDescription('Votre message d\'annonce').setRequired(true)),
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
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};