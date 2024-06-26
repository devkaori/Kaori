const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    let type = 'reply';
    if (interaction.isCommand()) type = 'editreply';

    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            const ticketCategory = interaction.guild.channels.cache.get(data.Category);

            if (ticketCategory == undefined) {
                return client.errNormal({
                    error: "Effectuez la configuration du ticket !",
                    image: `https://i.imgur.com/IFqedKi.png`,
                    type: type
                }, interaction)
            }

            if (interaction.channel.parentId == ticketCategory.id) {
                client.simpleEmbed({
                    desc: `Supprimez ce ticket dans **5s**`,
                    image: `https://i.imgur.com/IFqedKi.png`,
                    type: type
                }, interaction).then(msg => setTimeout(() => {
                    interaction.channel.delete();
                    ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id }, async (err, data) => {
                        if (data) {
                            var remove = await ticketChannels.deleteOne({ Guild: interaction.guild.id, channelID: interaction.channel.id });
                        }
                    })
                }, 5000));
            }
            else {
                client.errNormal({
                    error: "Ce n'est pas un ticket !",
                    image: `https://i.imgur.com/IFqedKi.png`,
                    type: type
                }, interaction);
            }
        }
        else {
            return client.errNormal({
                error: "Effectuez la configuration du ticket !",
                image: `https://i.imgur.com/IFqedKi.png`,
                type: type
            }, interaction)
        }
    })
}