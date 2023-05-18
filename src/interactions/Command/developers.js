const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const model = require('../../database/models/badge');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('developers')
        .setDescription('Commandes pour les développeurs du bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie des développeurs')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('eval')
                .setDescription(`Obtenir le résultat d'un morceau de code`)
                .addStringOption(option => option.setName('code').setDescription('Votre code').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('badge')
                .setDescription('Gérer les badges du bot')
                .addBooleanOption(option => option.setName('new').setDescription('Sélectionnez un booléen').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('Sélectionnez un utilisateur').setRequired(true))
                .addStringOption(option => option.setName('badge').setDescription('Choisissez votre badge').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Gérer les interdictions du bot')
                .addBooleanOption(option => option.setName('new').setDescription('Sélectionnez un booléen').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('Sélectionnez un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('credits')
                .setDescription('Gérer les crédits du bot')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Le type de crédits')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Ajouter', value: 'add' },
                            { name: 'Supprimer', value: 'remove' }
                        )
                )
                .addUserOption(option => option.setName('user').setDescription('Sélectionnez un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Montant des crédits').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('args')
                .setDescription('Publier des messages prédéfinis')
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('Sélectionnez un message')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Information', value: 'information' },
                            { name: 'Règles', value: 'rules' },
                            { name: 'Candidatures', value: 'applications' },
                            { name: 'Avantages des boosters', value: 'boosterperks' },
                            { name: 'Liens', value: 'links' },
                            { name: 'Récompenses', value: 'rewards' },
                            { name: 'Nos bots', value: 'ourbots' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('servers')
                .setDescription('Voir tous les serveurs de ce shard')
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        model.findOne({ User: interaction.user.id }, async (err, data) => {
            if (data && data.FLAGS.includes("DEVELOPER")) {
                await interaction.deferReply({ fetchReply: true });
                client.loadSubcommands(client, interaction, args);
            } else {
                return client.errNormal({
                    error: 'Seuls les développeurs du bot sont autorisés à effectuer cette action',
                    type: 'ephemeral'
                }, interaction)
            }
        })
    },
};