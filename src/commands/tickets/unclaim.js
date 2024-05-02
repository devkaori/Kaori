const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
    const ticketData = await ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id })

    if (ticketData) {
        if (interaction.user.id !== ticketData.creator) {
            const perms = await client.checkUserPerms({
                flags: [Discord.PermissionsBitField.Flags.ManageMessages],
                perms: [Discord.PermissionsBitField.Flags.ManageMessages]
            }, interaction)
        
            if (perms == false) return;

            if (data) {
                if (ticketData.claimed == "" || ticketData.claimed == undefined || ticketData.claimed == "Aucun") {
                    client.errNormal({
                        text: "Ticket non réclamé !",
                        image: `https://i.imgur.com/IFqedKi.png`,
                        type: 'ephemeral'
                    }, interaction)
                }
                else {
                    if (ticketData.claimed == interaction.user.id) {
                        const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                        if (ticketCategory == undefined) {
                            return client.errNormal({
                                error: "Effectuez la configuration !",
                                image: `https://i.imgur.com/IFqedKi.png`,
                                type: 'editreply'
                            }, interaction);
                        }

                        if (interaction.channel.parentId == ticketCategory.id) {

                            ticketData.claimed = "Aucun";
                            ticketData.save();

                            return client.simpleEmbed({
                                desc: `Ce ticket peut maintenant être réclamé à nouveau !`,
                                image: `https://i.imgur.com/IFqedKi.png`,
                                type: 'editreply'
                            }, interaction)

                        }
                        else {
                            client.errNormal({
                                error: "Ce n'est pas un ticket !",
                                image: `https://i.imgur.com/IFqedKi.png`,
                                type: 'editreply'
                            }, interaction)
                        }
                    }
                    else {
                        client.errNormal({
                            error: "Vous n'avez pas réclamé ce ticket !",
                            image: `https://i.imgur.com/IFqedKi.png`,
                            type: 'editreply'
                        }, interaction)
                    }
                }
            }
            else {
                return client.errNormal({
                    error: "Effectuez la configuration du ticket !",
                    image: `https://i.imgur.com/IFqedKi.png`,
                    type: 'editreply'
                }, interaction)
            }
        }
    }
}