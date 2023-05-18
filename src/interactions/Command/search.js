const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Rechercher quelque chose sur Internet')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie de recherche')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bing')
                .setDescription('Trouver quelque chose sur Bing')
                .addStringOption(option => option.setName('name').setDescription('Le nom de votre recherche').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ddg')
                .setDescription('Trouver quelque chose sur DuckDuckGo')
                .addStringOption(option => option.setName('name').setDescription('Le nom de votre recherche').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('google')
                .setDescription('Trouver quelque chose sur Google')
                .addStringOption(option => option.setName('name').setDescription('Le nom de votre recherche').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('youtube')
                .setDescription('Trouver quelque chose sur YouTube')
                .addStringOption(option => option.setName('name').setDescription('Le nom de votre recherche').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('corona')
                .setDescription('Voir les statistiques du coronavirus')
                .addStringOption(option => option.setName('country').setDescription('Entrez un pays').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand 
                .setName('crypto')
                .setDescription(`Voir la valeur d'une crypto-monnaie`)
                .addStringOption(option => option.setName('coin').setDescription('Entrez une crypto-monnaie').setRequired(true))
                .addStringOption(option => option.setName('currency').setDescription('Entrez une devise').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('docs')
                .setDescription('Voir la documentation de discord.js')
                .addStringOption(option => option.setName('name').setDescription('Le nom de votre recherche').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('github')
                .setDescription('Obtenir des informations sur un utilisateur GitHub en entrant simplement leur nom d\'utilisateur')
                .addStringOption(option => option.setName('name').setDescription('Entrez un nom d\'utilisateur GitHub').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hexcolour')
                .setDescription('Obtenir des informations sur une couleur')
                .addStringOption(option => option.setName('color').setDescription('Entrez une couleur hexadécimale').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('itunes')
                .setDescription('Rechercher sur iTunes une chanson quelconque')
                .addStringOption(option => option.setName('song').setDescription('Entrez le nom d\'une chanson').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('npm')
                .setDescription('Obtenir des informations sur un package NPM')
                .addStringOption(option => option.setName('name').setDescription('Entrez le nom d\'un package').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('steam')
                .setDescription('Obtenir des informations sur une application sur Steam')
                .addStringOption(option => option.setName('name').setDescription('Entrez le nom d\'une application Steam').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('translate')
                .setDescription('Traduire un texte')
                .addStringOption(option => option.setName('language').setDescription('Entrez une langue').setRequired(true))
                .addStringOption(option => option.setName('text').setDescription('Entrez un texte').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weather')
                .setDescription('Voir la météo actuelle')
                .addStringOption(option => option.setName('location').setDescription('Entrez le nom d\'un lieu').setRequired(true))
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