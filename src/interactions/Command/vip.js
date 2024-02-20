const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const model = require('../../database/models/badge');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vip')
    .setDescription('Commandes VIP d\'interaction entre personnes')
    .addSubcommand(subcommand =>
        subcommand
            .setName('pat')
            .setDescription('Faites une caresse à quelqu\'un')
            .addUserOption(option => option.setName('cible').setDescription('Sélectionnez la personne à caresser').setRequired(true))
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('poke')
            .setDescription('Donne un petit coup à quelqu\'un')
            .addUserOption(option => option.setName('cible').setDescription('Sélectionnez la personne à toucher').setRequired(true))
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('slap')
            .setDescription('Donne une gifle à quelqu\'un')
            .addUserOption(option => option.setName('cible').setDescription('Sélectionnez la personne à gifler').setRequired(true))
    )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        model.findOne({ User: interaction.user.id }, async (err, data) => {
            if (data && data.FLAGS.includes("VIP")) {
                await interaction.deferReply({ fetchReply: true });
                client.loadSubcommands(client, interaction, args);
            } else {
                return client.errNormal({
                    error: 'Seuls les **VIP** sont autorisés à effectuer cette action deviens le [ici](https://ko-fi.com/kaorifr).',
                    type: 'ephemeral'
                }, interaction)
            }
        })
    },
};