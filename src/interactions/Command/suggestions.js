const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestions')
        .setDescription('Gérer les suggestions')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie des suggestions')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('accept')
                .setDescription('Accepter une suggestion')
                .addStringOption(option => option.setName('id').setDescription('ID du message de suggestion').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deny')
                .setDescription('Refuser une suggestion')
                .addStringOption(option => option.setName('id').setDescription('ID du message de suggestion').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('send')
                .setDescription('Envoyer une suggestion')
                .addStringOption(option => option.setName('suggestion').setDescription('Votre suggestion').setRequired(true))
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