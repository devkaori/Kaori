const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Joue de la musique dans Kaori')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie "musique"')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bassboost')
                .setDescription('Définir le niveau de bassboost')
                .addStringOption(option =>
                    option.setName('level')
                        .setDescription('Le niveau de bassboost')
                        .setRequired(true)
                        .addChoices(
                            { name: '0', value: '0' },
                            { name: '1', value: '1' },
                            { name: '2', value: '2' },
                            { name: '3', value: '3' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('play')
                .setDescription('Démarrer la musique')
                .addStringOption(option => option.setName('song').setDescription(`Entrer le nom/url d'une chanson`).setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription(`Supprimer la file d'attente de musique`)
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('loop')
                .setDescription('Mettre la musique en boucle')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lyrics')
                .setDescription('Obtenir les paroles de la chanson en cours')
                .addStringOption(option => option.setName('song').setDescription(`Entrer le nom d'une chanson`))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('playing')
                .setDescription('Voir quelle chanson est en cours de lecture')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Mettre la musique en pause')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('previous')
                .setDescription('Lire la chanson précédente')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('queue')
                .setDescription(`Voir la file d'attente de musique`)
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('resume')
                .setDescription('Reprendre la musique')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription(`Supprimer une chanson de la file d'attente`)
                .addNumberOption(option => option.setName('number').setDescription('Numéro de la chanson').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('seek')
                .setDescription('Chercher la position actuelle de la musique')
                .addNumberOption(option => option.setName('time').setDescription('Nouvelle position de la chanson').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('shuffle')
                .setDescription('Mélanger la musique')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('skip')
                .setDescription('Passer à la chanson suivante')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('skipto')
                .setDescription('Passer à une nouvelle chanson')
                .addNumberOption(option => option.setName('number').setDescription('Numéro de la chanson').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stop')
                .setDescription('Arrêter la musique')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('volume')
                .setDescription('Définir le volume de la musique')
                .addNumberOption(option => option.setName('amount').setDescription('Nouveau volume'))
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.checkBotPerms({
            flags: [Discord.PermissionsBitField.Flags.Connect, Discord.PermissionsBitField.Flags.Speak],
            perms: [Discord.PermissionsBitField.Flags.Connect, Discord.PermissionsBitField.Flags.Speak]
        }, interaction)

        client.loadSubcommands(client, interaction, args);
    },
};