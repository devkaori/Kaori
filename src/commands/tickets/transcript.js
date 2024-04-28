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

    ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id }, async (err, ticketData) => {
        if (ticketData) {
            ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                if (data) {
                    const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                    if (ticketCategory == undefined) {
                        return client.errNormal({
                            error: "Effectuez la configuration !",
                            image: `https://i.imgur.com/IFqedKi.png`,
                            type: type
                        }, interaction);
                    }

                    if (interaction.channel.parentId == ticketCategory.id) {
                        return client.simpleEmbed({
                            desc: `${client.emotes.animated.loading}・Sauvegarde de la transcription en cours...`,
                            image: `https://i.imgur.com/IFqedKi.png`,
                            type: type
                        }, interaction).then(async (editMsg) => {
                            client.transcript(interaction, interaction.channel).then(() => {

                                return client.simpleEmbed({
                                    desc: `Transcription sauvegardée`,
                                    type: 'editreply'
                                }, interaction)

                            })
                        });
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
                        error: "Effectuez la configuration !",
                        image: `https://i.imgur.com/IFqedKi.png`,
                        type: type
                    }, interaction);
                }
            })
        }
    })
}