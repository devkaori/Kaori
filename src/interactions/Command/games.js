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
                            { name: '🪨 Pierre', value: 'pierre' },
                            { name: '📃 Papier', value: 'feuille' },
                            { name: '✂️ Ciseaux', value: 'ciseaux' }
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
