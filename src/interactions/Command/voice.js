const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Gérer les salons vocaux')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription("Obtenir des informations sur les commandes de la catégorie des salons vocaux")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('limit')
                .setDescription("Limiter votre salon vocal personnalisé")
                .addNumberOption(option => option.setName('limit').setDescription("Entrer une limite").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lock')
                .setDescription("Verrouiller votre salon vocal personnalisé")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rename')
                .setDescription("Renommer votre salon vocal personnalisé")
                .addStringOption(option => option.setName('name').setDescription("Nouveau nom du salon vocal").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unlock')
                .setDescription("Déverrouiller votre salon vocal personnalisé")
        )
    ,

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