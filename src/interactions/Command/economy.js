const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('economy')
        .setDescription(`Jouez au jeu de l'économie dans votre serveur`)
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription("Obtenir des informations sur les commandes de la catégorie d'économie")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('additem')
                .setDescription('Ajouter un rôle en tant qu\'élément dans la boutique de l\'économie')
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Entrez un montant').setRequired(true))

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('addmoney')
                .setDescription('Ajouter de l\'argent à un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionnez un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('balance')
                .setDescription('Voir votre solde')
                .addUserOption(option => option.setName('user').setDescription('Sélectionnez un utilisateur').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('beg')
                .setDescription('Demander de l\'argent')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('buy')
                .setDescription('Acheter des éléments dans la boutique du bot')

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Effacer l\'économie')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('crime')
                .setDescription('Commeter un crime')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('daily')
                .setDescription('Réclamer votre argent quotidien')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deleteitem')
                .setDescription('Supprimer un rôle de l\'élément dans la boutique de l\'économie')
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deposit')
                .setDescription('Déposer de l\'argent à la banque')
                .addNumberOption(option => option.setName('amount').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fish')
                .setDescription('Pêcher des poissons')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hourly')
                .setDescription('Réclamer votre argent horaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hunt')
                .setDescription('Chasser des animaux')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('monthly')
                .setDescription('Réclamer votre argent mensuel')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pay')
                .setDescription('Payer un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionnez un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('present')
                .setDescription('Obtenir un cadeau hebdomadaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('removemoney')
                .setDescription('Retirer de l\'argent à un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionnez un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rob')
                .setDescription('Dévaliser un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionnez un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('store')
                .setDescription('Afficher la boutique de ce serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weekly')
                .setDescription('Réclamer votre argent hebdomadaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('withdraw')
                .setDescription('Retirer votre argent')
                .addNumberOption(option => option.setName('amount').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('work')
                .setDescription('Aller travailler')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('yearly')
                .setDescription('Réclamer votre argent annuel')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Voir le classement de l\'économie')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Le type de classement que vous souhaitez')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Argent', value: 'money'},
                            {name: 'Banque', value: 'bank'}
                        )
                )
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.reply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};
