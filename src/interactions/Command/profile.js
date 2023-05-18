const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Créez un profil pour le serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie "profil"')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Créez votre profil')
        ).addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprimez votre profil')
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('profile')
                .setDescription('Affichez votre profil')
                .addUserOption((option) =>
                    option.setName('user').setDescription('L\'utilisateur dont vous souhaitez obtenir le profil').setRequired(false),
                )
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('aboutme')
                .setDescription('Définissez votre présentation')
                .addStringOption(option => option.setName('text').setDescription('Entrez une présentation').setRequired(true))
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('age')
                .setDescription('Définissez votre âge')
                .addNumberOption(option => option.setName('number').setDescription('Entrez un nombre').setRequired(true))
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('bday')
                .setDescription('Définissez votre date de naissance')
                .addStringOption(option => option.setName('bday').setDescription('Entrez une date de naissance').setRequired(true))
        )

        .addSubcommandGroup((group) =>
            group
                .setName('actor')
                .setDescription('Définissez votre acteur préféré')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addactor')
                        .setDescription('L\'acteur que vous souhaitez ajouter')
                        .addStringOption(option => option.setName('actor').setDescription('L\'acteur que vous souhaitez ajouter').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delactor')
                        .setDescription("L'acteur que vous souhaitez supprimer")
                        .addStringOption(option => option.setName('actor').setDescription('L\'acteur que vous souhaitez supprimer').setRequired(true)),
                )
        ).
        addSubcommandGroup((group) =>
            group
                .setName('artist')
                .setDescription('Définissez votre artiste préféré')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addartist')
                        .setDescription('L\'artiste que vous souhaitez ajouter')
                        .addStringOption(option => option.setName('artist').setDescription('L\'artiste que vous souhaitez ajouter').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delartist')
                        .setDescription("L'artiste que vous souhaitez supprimer")
                        .addStringOption(option => option.setName('artist').setDescription('L\'artiste que vous souhaitez supprimer').setRequired(true)),
                )
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('color')
                .setDescription('Définissez votre couleur préférée')
                .addStringOption(option => option.setName('color').setDescription('La couleur que vous souhaitez définir').setRequired(true)),

        ).addSubcommandGroup((group) =>
            group
                .setName('food')
                .setDescription('Définissez votre nourriture préférée')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addfood')
                        .setDescription('La nourriture que vous souhaitez ajouter')
                        .addStringOption(option => option.setName('food').setDescription('La nourriture que vous souhaitez ajouter').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delfood')
                        .setDescription("La nourriture que vous souhaitez supprimer")
                        .addStringOption(option => option.setName('food').setDescription('La nourriture que vous souhaitez supprimer').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('movie')
                .setDescription('Définissez votre film préféré')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addmovie')
                        .setDescription('Le film que vous souhaitez ajouter')
                        .addStringOption(option => option.setName('movie').setDescription('Le film que vous souhaitez ajouter').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delmovie')
                        .setDescription("Le film que vous souhaitez supprimer")
                        .addStringOption(option => option.setName('movie').setDescription('Le film que vous souhaitez supprimer').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('pet')
                .setDescription('Définissez votre animal de compagnie préféré')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addpet')
                        .setDescription('L\'animal de compagnie que vous souhaitez ajouter')
                        .addStringOption(option => option.setName('pet').setDescription('L\'animal de compagnie que vous souhaitez ajouter').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delpet')
                        .setDescription("L'animal de compagnie que vous souhaitez supprimer")
                        .addStringOption(option => option.setName('pet').setDescription('L\'animal de compagnie que vous souhaitez supprimer').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('song')
                .setDescription('Définissez votre chanson préférée')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addsong')
                        .setDescription('La chanson que vous souhaitez ajouter')
                        .addStringOption(option => option.setName('song').setDescription('La chanson que vous souhaitez ajouter').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delsong')
                        .setDescription("La chanson que vous souhaitez supprimer")
                        .addStringOption(option => option.setName('song').setDescription('La chanson que vous souhaitez supprimer').setRequired(true)),
                )
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('gender')
                .setDescription('Définissez votre genre')

        ).addSubcommandGroup((group) =>
            group
                .setName('hobbies')
                .setDescription('Définissez votre passe-temps préféré')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addhobby')
                        .setDescription('Le passe-temps que vous souhaitez ajouter')
                        .addStringOption(option => option.setName('hobby').setDescription('Le passe-temps que vous souhaitez ajouter').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delhobby')
                        .setDescription("Le passe-temps que vous souhaitez supprimer")
                        .addStringOption(option => option.setName('hobby').setDescription('Le passe-temps que vous souhaitez supprimer').setRequired(true)),
                )
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('origin')
                .setDescription('Définissez votre origine')
                .addStringOption(option => option.setName('country').setDescription('Entrez un pays').setRequired(true))
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Définissez votre statut')
                .addStringOption(option => option.setName('text').setDescription('Entrez un statut').setRequired(true))
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