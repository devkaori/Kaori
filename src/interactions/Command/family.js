const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('family')
        .setDescription('Crée une famille dans Kaori')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie famille')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('adopt')
                .setDescription('Adopte un membre')
                .addUserOption(option => option.setName('user').setDescription('Sélectionne un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprime ta famille!'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('disown')
                .setDescription(`Répudie l'un de tes enfants ou un parent`)
                .addUserOption(option => option.setName('user').setDescription('Sélectionne un utilisateur').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('divorce')
                .setDescription('Divorce avec ton partenaire')
                .addUserOption(option => option.setName('user').setDescription('Sélectionne un utilisateur').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('family')
                .setDescription(`Voir qui fait partie de la famille de quelqu'un !`)
                .addUserOption(option => option.setName('user').setDescription('Sélectionne un utilisateur').setRequired(false)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('propose')
                .setDescription('Épouse un membre')
                .addUserOption(option => option.setName('user').setDescription('Sélectionne un utilisateur').setRequired(true)),
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