const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Gérer le module de modération automatique')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de configuration automatique')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antiinvite')
                .setDescription('Activer/désactiver la fonction anti-invitations')
                .addBooleanOption(option => option.setName('active').setDescription('Sélectionnez un booléen').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antilinks')
                .setDescription('Activer/désactiver la fonction anti-liens')
                .addBooleanOption(option => option.setName('active').setDescription('Sélectionnez un booléen').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antispam')
                .setDescription('Activer/désactiver la fonction anti-spam')
                .addBooleanOption(option => option.setName('active').setDescription('Sélectionnez un booléen').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('linkschannel')
                .setDescription('Ajouter un salon autorisé à envoyer des liens')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Que souhaitez-vous faire avec le salon ?')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Ajouter', value: 'add' },
                            { name: 'Supprimer', value: 'remove' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Sélectionnez un salon').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommandGroup(group =>
            group
                .setName('blacklist')
                .setDescription('Gérer la liste noire')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('display')
                        .setDescription('Afficher la liste noire complète')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('add')
                        .setDescription('Ajouter un mot à la liste noire')
                        .addStringOption(option => option.setName('word').setDescription('Le mot pour la liste noire').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('remove')
                        .setDescription('Supprimer un mot de la liste noire')
                        .addStringOption(option => option.setName('word').setDescription('Le mot pour la liste noire').setRequired(true))
                )
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};