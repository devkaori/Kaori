const { CommandInteraction, Client } = require('discord.js');
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Unwarn')
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

        if (!perms) {
            client.errNormal({
                error: "Vous n'avez pas les permissions nécessaires pour utiliser cette commande !",
                type: 'ephemeral'
            }, interaction);
            return;
        }

        await interaction.deferReply({ ephemeral: true });

        const member = interaction.guild.members.cache.get(interaction.targetId);

        Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
            if (data) {
                const menu = new Discord.MessageSelectMenu()
                    .setCustomId('unwarn')
                    .setPlaceholder('Sélectionnez un avertissement à supprimer');

                // Obtenir tous les avertissements et les ajouter au menu de sélection
                data.Warnings.forEach(element => {
                    menu.addOptions({
                        label: `Case ${element.Case}`,
                        value: element.Case.toString(),
                        description: "Raison : " + element.Reason
                    });
                });

                // Créer un nouveau message avec le menu
                client.embed({
                    title: `Unwarn`,
                    desc: `Sélectionnez un avertissement à supprimer pour **${member.user.tag}**`,
                    components: [new Discord.MessageActionRow().addComponents(menu)],
                    type: 'ephemeraledit'
                }, interaction);

                // Créer un nouveau collecteur pour le menu
                const filter = i => i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

                collector.on('collect', async i => {
                    if (i.customId === 'unwarn') {
                        // Supprimer l'avertissement de la base de données
                        data.Warnings.splice(data.Warnings.findIndex(element => element.Case == i.values[0]), 1);
                        data.save();

                        // Supprimer le menu du message
                        i.update({
                            components: []
                        });

                        // Envoyer un message de succès
                        client.succNormal({
                            text: `L'avertissement a été supprimé avec succès`,
                            fields: [
                                {
                                    name: "Utilisateur",
                                    value: `${member}`,
                                    inline: true
                                }
                            ],
                            type: 'ephemeraledit'
                        }, interaction);

                        client.emit('warnRemove', member, interaction.user);

                        client.embed({
                            title: `Unwarn`,
                            desc: `Vous avez été désaverti dans **${interaction.guild.name}**`,
                            fields: [
                                {
                                    name: "Modérateur",
                                    value: interaction.user.tag,
                                    inline: true
                                },
                            ]
                        }, member).catch(() => {});
                    }
                });
            } else {
                client.errNormal({
                    error: "L'utilisateur n'a aucun avertissement !",
                    type: 'ephemeraledit'
                }, interaction);
            }
        });
    },
};