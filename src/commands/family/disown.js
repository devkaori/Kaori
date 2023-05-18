const Discord = require('discord.js');

const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user');
    const author = interaction.user;
    const guild = { Guild: interaction.guild.id };

    if (author.id == target.id) return client.errNormal({
        error: "Vous ne pouvez pas vous renier vous-même",
        type: 'editreply'
    }, interaction);

    if (target.bot) return client.errNormal({
        error: "Vous ne pouvez pas renier un bot",
        type: 'editreply'
    }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, Parent: target.id }, async (err, data) => {
        if (data) {
            Schema.findOne({ Guild: interaction.guild.id, User: data.Parent }, async (err, data2) => {
                if (data2) {
                    client.embed({ title: `Renié`, desc: `${author} a renié <@!${data.Parent}>`, type: 'editreply' }, interaction);

                    data.Parent = null;
                    data.save();
                }
            })
        }
        else {
            Schema.findOne({ Guild: interaction.guild.id, User: author.id }, async (err, data) => {
                if (data) {
                    if (data.Children.includes(target.username)) {
                        const filtered = data.Children.filter((user) => user !== target.username);

                        await Schema.findOneAndUpdate(guild, {
                            Guild: interaction.guild.id,
                            User: author.id,
                            Children: filtered
                        });

                        Schema.findOne({ Guild: interaction.guild.id, Parent: author.id }, async (err, data) => {
                            if (data) {
                                data.Parent = null;
                                data.save();
                            }
                        })

                        client.embed({ title: `Renégocié`, desc: `${author} a renié <@!${target.id}>`, type: 'editreply' }, interaction);
                    }
                    else {
                        client.errNormal({ error: "Vous n'avez actuellement ni enfants ni parents", type: 'editreply' }, interaction);
                    }
                }
                else {
                    client.errNormal({ error: "Vous n'avez actuellement ni enfants ni parents", type: 'editreply' }, interaction);
                }
            })
        }
    })
}
