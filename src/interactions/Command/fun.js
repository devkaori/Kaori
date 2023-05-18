const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun')
        .setDescription('Exécute des commandes amusantes dans Kaori')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes amusantes de la catégorie')
        )

        // Commandes de mème

        .addSubcommandGroup((group) =>
            group
                .setName('meme')
                .setDescription('Voir toutes les commandes amusantes de mèmes du bot')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('confused')
                        .setDescription('Réagir avec un mème de Confused Nick Young')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('cleverrate')
                        .setDescription('Voir à quel point vous êtes intelligent')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('dinochrome')
                        .setDescription('Dinosaure dans Chrome')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('epicgamerrate')
                        .setDescription('Voir à quel point vous êtes un joueur épique')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('howgay')
                        .setDescription('Voir à quel point vous êtes gay')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('roast')
                        .setDescription('Insulter un utilisateur')
                        .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('simprate')
                        .setDescription('Voir à quel point vous êtes simpe')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('stankrate')
                        .setDescription('Voir à quel point vous sentez mauvais')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('rickroll')
                        .setDescription('Obtenir un rickroll')
                )
        )

        // Commandes utilisateur

        .addSubcommandGroup((group) =>
            group
                .setName('user')
                .setDescription('Voir toutes les commandes amusantes utilisateur du bot')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('hack')
                        .setDescription('Pirater vos amis ou ennemis !')
                        .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('hug')
                        .setDescription('Faire un câlin à un utilisateur')
                        .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('kill')
                        .setDescription('Tuer un utilisateur')
                        .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('lovemeter')
                        .setDescription('Voir à quel point vous vous entendez avec quelqu\'un')
                        .addUserOption(option => option.setName('user1').setDescription('Sélectionner un utilisateur').setRequired(true))
                        .addUserOption(option => option.setName('user2').setDescription('Sélectionner un utilisateur').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('sudo')
                        .setDescription(`Dire quelque chose comme quelqu\'un d'autre`)
                        .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                        .addStringOption(option => option.setName('text').setDescription('Saisir un texte').setRequired(true))
                )
        )

        // Commandes de texte

        .addSubcommandGroup((group) =>
            group
                .setName('text')
                .setDescription('Voir toutes les commandes amusantes de texte du bot')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('ascii')
                        .setDescription('Générer du texte ASCII')
                        .addStringOption(option => option.setName('text').setDescription('Saisir un texte').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('gif')
                        .setDescription('Rechercher un gif')
                        .addStringOption(option => option.setName('text').setDescription('Saisir un texte').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('reverse')
                        .setDescription('Inverser votre texte')
                        .addStringOption(option => option.setName('text').setDescription('Saisir un texte').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('say')
                        .setDescription('Faire dire quelque chose au bot')
                        .addStringOption(option => option.setName('text').setDescription('Saisir un texte').setRequired(true))
                )
        )

        // Commandes supplémentaires

        .addSubcommandGroup((group) =>
            group
                .setName('extra')
                .setDescription('Voir toutes les commandes supplémentaires amusantes du bot')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('birdfact')
                        .setDescription('Obtenir un fait aléatoire sur les oiseaux')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('catfact')
                        .setDescription('Obtenir un fait aléatoire sur les chats')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('dogfact')
                        .setDescription('Obtenir un fait aléatoire sur les chiens')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('fact')
                        .setDescription('Obtenir un fait aléatoire')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('koalafact')
                        .setDescription('Obtenir un fait aléatoire sur les koalas')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('pandafact')
                        .setDescription('Obtenir un fait aléatoire sur les pandas')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('token')
                        .setDescription('Obtenir mon jeton')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('worldclock')
                        .setDescription('Afficher l\'heure du monde (ou des fuseaux horaires spécifiques)')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('xmas')
                        .setDescription('Voir le nombre de jours jusqu\'à Noël')
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