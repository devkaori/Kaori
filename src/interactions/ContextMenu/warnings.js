const { CommandInteraction, Client } = require('discord.js');
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Warnings')
        .setType(2),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const perms = await client.checkPerms({
            flags: [Discord.Permissions.FLAGS.MANAGE_MESSAGES],
            perms: [Discord.Permissions.FLAGS.MANAGE_MESSAGES]
        }, interaction);

        if (perms === false) {
            client.errNormal({
                error: "Vous n'avez pas les permissions requises pour utiliser cette commande !",
                type: 'ephemeral'
            }, interaction);
            return;
        }
        await interaction.deferReply({ ephemeral: false });

        const member = interaction.guild.members.cache.get(interaction.targetId);

        Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
            if (data) {
                var fields = [];
                data.Warnings.forEach(element => {
                    fields.push({
                        name: "Avertissement **" + element.Case + "**",
                        value: "Raison : " + element.Reason + "\nModérateur <@!" + element.Moderator + ">",
                        inline: true
                    });
                });
                client.embed({
                    title: `Avertissements`,
                    desc: `Les avertissements de **${member.user.tag}**`,
                    fields: [
                        {
                            name: "Total",
                            value: `${data.Warnings.length}`,
                        },
                        ...fields
                    ],
                    type: 'editreply'
                }, interaction);
            } else {
                client.embed({
                    title: `Avertissements`,
                    desc: `L'utilisateur ${member.user.tag} n'a aucun avertissement !`,
                    type: 'editreply'
                }, interaction);
            }
        });
    },
};