const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('games')
        .setDescription('Jouer à des jeux avec le bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie jeux')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('8ball')
                .setDescription('Demander une question au bot')
                .addStringOption(option => option.setName('question').setDescription('La question que vous voulez poser').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fasttype')
                .setDescription('Apprendre à taper plus rapidement')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('music-trivia')
                .setDescription('Jouer à un jeu de questions musicales')
                .addNumberOption(option => option.setName('number').setDescription('Le nombre de chansons').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roll')
                .setDescription('Lancer un dé')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rps')
                .setDescription('Jouer à pierre-feuille-ciseaux contre le bot')
                .addStringOption(option =>
                    option.setName('option')
                        .setDescription('Choisissez votre option')
                        .setRequired(true)
                        .addChoices(
                            { name: '🪨 Pierre', value: 'rock' },
                            { name: '📃 Papier', value: 'paper' },
                            { name: '✂️ Ciseaux', value: 'scissors' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('skipword')
                .setDescription('Passer au mot suivant')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('snake')
                .setDescription('Jouer au jeu du serpent')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('trivia')
                .setDescription('Jouer à Trivia')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('willyoupressthebutton')
                .setDescription('Jouer à "Appuieras-tu sur le bouton ?"')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('wouldyourather')
                .setDescription('Jouer à "Préférerais-tu ?"')
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