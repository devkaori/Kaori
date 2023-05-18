const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stickymessages')
        .setDescription('Gérer les messages épinglés')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie des messages épinglés')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stick')
                .setDescription('Épingler un message dans un salon')
                .addChannelOption(option => option.setName('channel').setDescription('Sélectionner un salon').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addStringOption(option => option.setName('message').setDescription('Vos messages épinglés').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('messages')
                .setDescription('Afficher tous vos messages épinglés dans le serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unstick')
                .setDescription('Retirer l\'épinglage d\'un message dans un salon')
                .addChannelOption(option => option.setName('channel').setDescription('Sélectionner un salon').setRequired(true).addChannelTypes(ChannelType.GuildText))
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