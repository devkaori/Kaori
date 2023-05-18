const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('radio')
        .setDescription('Joue la radio sur Kaori')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtient des informations sur les commandes de la catégorie radio')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('play')
                .setDescription('Démarre la radio'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stop')
                .setDescription('Arrête la radio'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('playing')
                .setDescription('Affiche ce qui est en train de jouer maintenant'),
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
        if (!interaction.member.voice.channel) return client.errNormal({ 
            error: `Tu n'es pas dans un salon vocal !`, 
            type: 'editreply' 
        }, interaction);

        client.loadSubcommands(client, interaction, args);
    },
};