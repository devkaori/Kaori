const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tickets')
        .setDescription('Gérer les tickets sur votre serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription("Obtenir des informations sur les commandes de la catégorie des tickets")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription("Ajouter un utilisateur à un ticket")
                .addUserOption(option => option.setName('user').setDescription("Sélectionnez un utilisateur").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('claim')
                .setDescription("Réclamer un ticket")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('close')
                .setDescription("Fermer un ticket")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription("Supprimer un ticket")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('information')
                .setDescription("Informations sur un ticket")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lower')
                .setDescription("Abaisser un ticket")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription("Créer un ticket")
                .addStringOption(option => option.setName('reason').setDescription("Raison d'ouvrir un ticket"))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('notice')
                .setDescription("Envoyer un avis à un ticket")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('open')
                .setDescription("Réouvrir un ticket")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('raise')
                .setDescription("Élever un ticket")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription("Supprimer un utilisateur d'un ticket")
                .addUserOption(option => option.setName('user').setDescription("Sélectionnez un utilisateur").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rename')
                .setDescription("Renommer un ticket")
                .addStringOption(option => option.setName('name').setDescription("Nouveau nom du ticket").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('transcript')
                .setDescription("Transcrire un ticket")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unclaim')
                .setDescription("Annuler la réclamation d'un ticket")
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