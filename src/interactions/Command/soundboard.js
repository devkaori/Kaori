const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    // Meme Images

    data: new SlashCommandBuilder()
        .setName('soundboard')
        .setDescription('Joue tous les sons dans Kaori')

        .addSubcommand((subcommand) =>
            subcommand
                .setName('help')
                .setDescription('Obtenez des informations sur les commandes de la catégorie soundboard')
        )
        
        // Sons Windows
        .addSubcommandGroup((group) =>
            group
                .setName('windows')
                .setDescription('Joue les sons Windows dans le Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('windowserror')
                        .setDescription(`Joue le son d'erreur Windows`)
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('windowsshutdown')
                        .setDescription(`Joue le son d'arrêt Windows`)
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('windowsstartup')
                        .setDescription('Joue le son de démarrage Windows')
                )
        )

        // Sons Earrape

        .addSubcommandGroup((group) =>
            group
                .setName('earrape')
                .setDescription('Joue les sons Earrape dans le Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('reee')
                        .setDescription('Joue le son reee')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('defaultdance')
                        .setDescription('Joue le son defaultdance')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('startup')
                        .setDescription('Joue le son de démarrage')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('thomas')
                        .setDescription('Joue le son thomas')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('wegothim')
                        .setDescription('Joue le son wegothim')
                )
        )

        // Sons de chansons

        .addSubcommandGroup((group) =>
            group
                .setName('songs')
                .setDescription('Joue les sons de chansons dans le Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('dancememe')
                        .setDescription('Joue le son dancememe')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('despacito')
                        .setDescription('Joue le son despacito')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('elevator')
                        .setDescription('Joue le son elevator')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('rickastley')
                        .setDescription('Joue le son rickastley')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('running')
                        .setDescription('Joue le son running')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('tobecontinued')
                        .setDescription('Joue le son tobecontinued')
                )
        )

        // Sons Discord

        .addSubcommandGroup((group) =>
            group
                .setName('discord')
                .setDescription('Joue les sons Discord dans le Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('discordcall')
                        .setDescription(`Joue le son d'appel Discord`),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('discordjoin')
                        .setDescription('Joue le son de connexion à un appel vocal Discord'),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('discordleave').setDescription(`Joue le son de départ d'un appel vocal Discord`)
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('discordnotification')
                        .setDescription('Joue le son de notification Discord'),
                )
        )

        // Sons Meme

        .addSubcommandGroup((group) =>
            group
                .setName('memes')
                .setDescription('Joue les sons de mème dans le Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('fbi')
                        .setDescription('Joue le son fbi'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('jeff')
                        .setDescription('Joue le son jeff'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('lambo')
                        .setDescription('Joue le son lambo'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('missionfailed')
                        .setDescription('Joue le son missionfailed'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('moaning')
                        .setDescription('Joue le son moaning'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('nani')
                        .setDescription('Joue le son nani'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('nyancat')
                        .setDescription('Joue le son nyancat'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('ohh')
                        .setDescription('Joue le son ohh'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('rimshot')
                        .setDescription('Joue le son rimshot'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('roblox')
                        .setDescription('Joue le son roblox'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('shotdown')
                        .setDescription('Joue le son shotdown'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('spongebob')
                        .setDescription('Joue le son spongebob'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('wow')
                        .setDescription('Joue le son wow'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('yeet')
                        .setDescription('Joue le son yeet'),
                )
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