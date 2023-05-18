const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('thanks')
        .setDescription("Obtenir un aperçu du système de remerciements")
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription("Obtenir des informations sur les commandes de la catégorie des remerciements")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription("Voir vos remerciements")
                .addUserOption(option => option.setName('user').setDescription("Sélectionnez un utilisateur").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('thanks')
                .setDescription("Remercier un utilisateur")
                .addUserOption(option => option.setName('user').setDescription("Sélectionnez un utilisateur").setRequired(true))
        ),

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