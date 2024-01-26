const Discord = require('discord.js');

const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user');
    const author = interaction.user;
    const guild = { Guild: interaction.guild.id };

    if (author.id == target.id) return client.errNormal({ error: "Vous ne pouvez pas vous marier avec vous-même !", type: 'editreply' }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, Partner: author.id }, async (err, data) => {
        if (data) {
            client.errNormal({ error: "Quelqu'un dans le couple est déjà marié(e) !", type: 'editreply' }, interaction);
        }
        else {
            Schema.findOne({ Guild: interaction.guild.id, Partner: target.id }, async (err, data) => {
                if (data) {
                    client.errNormal({ error: "Quelqu'un dans le couple est déjà marié(e) !", type: 'editreply' }, interaction);
                }
                else {
                    Schema.findOne({ Guild: interaction.guild.id, User: target.id, Parent: author.id }, async (err, data) => {
                        if (data) {
                            client.errNormal({ error: "Vous ne pouvez pas vous marier avec un membre de votre famille !", type: 'editreply' }, interaction);
                        }
                        else {
                            Schema.findOne({ Guild: interaction.guild.id, User: author.id, Parent: target.id }, async (err, data) => {
                                if (data) {
                                    client.errNormal({ error: "Vous ne pouvez pas vous marier avec un membre de votre famille !", type: 'editreply' }, interaction);
                                }
                                else {
                                    Schema.findOne({ Guild: interaction.guild.id, User: author.id }, async (err, data) => {
                                        if (data) {
                                            if (data.Children.includes(target.id)) {
                                                client.errNormal({ error: "Vous ne pouvez pas vous marier avec un membre de votre famille !", type: 'editreply' }, interaction);
                                            }
                                            else {
                                                propose();
                                            }
                                        }
                                        else {
                                            propose();
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    function propose() {
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('propose_accept')
                    .setEmoji('✅')
                    .setStyle(Discord.ButtonStyle.Success),

                new Discord.ButtonBuilder()
                    .setCustomId('propose_deny')
                    .setEmoji('❌')
                    .setStyle(Discord.ButtonStyle.Danger),
            );

        client.embed({
            title: `Demande en mariage`,
            desc: `${author} a demandé à ${target} de se marier ! \n${target}, cliquez sur l'un des boutons`,
            components: [row],
            content: `${target}`,
            type: 'editreply'
        }, interaction);

        const filter = i => i.user.id === target.id;

        interaction.channel.awaitMessageComponent({ filter, componentType: Discord.ComponentType.Button, time: 6000000 }).then(async i => {
            if (i.customId == "propose_accept") {

                Schema.findOne({ Guild: interaction.guild.id, User: author.id }, async (err, data) => {
                    if (data) {
                        data.Partner = target.id
                        data.save();
                    }
                    else {
                        new Schema({
                            Guild: interaction.guild.id,
                            User: author.id,
                            Partner: target.id
                        }).save();
                    }
                })

                Schema.findOne({ Guild: interaction.guild.id, User: target.id }, async (err, data) => {
                    if (data) {
                        data.Partner = author.id
                        data.save();
                    }
                    else {
                        new Schema({
                            Guild: interaction.guild.id,
                            User: target.id,
                            Partner: author.id
                        }).save();
                    }
                })

                client.embed({
                    title: `Demande en mariage - Approuvée`,
                    desc: `${author} et ${target} sont maintenant mariés ! 👰🎉`,
                    components: [],
                    content: `${target}`,
                    type: 'editreply'
                }, interaction);
            }

            if (i.customId == "propose_deny") {
                client.embed({
                    title: `Demande en mariage - Refusée`,
                    desc: `${target} aime quelqu'un d'autre et a choisi de ne pas épouser ${author}`,
                    components: [],
                    content: `${target}`,
                    type: 'editreply'
                }, interaction);
            }
        }).catch(() => {
            client.embed({
                title: `Demande en mariage - Refusée`,
                desc: `${target} n'a rien répondu ! Le mariage est annulé`,
                components: [],
                content: `${target}`,
                type: 'editreply'
            }, interaction);
        });
    }
}
