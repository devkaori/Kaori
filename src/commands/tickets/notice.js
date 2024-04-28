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
            if (interaction.user.id !== ticketData.creator) {
                ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                    if (data) {
                        const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                        if (ticketCategory == undefined) {
                            return client.errNormal({
                                error: "Effectuez la configuration du ticket !",
                                image: `https://i.imgur.com/IFqedKi.png`,
                                type: type
                            }, interaction);
                        }

                        if (interaction.channel.parentId == ticketCategory.id) {
                            client.simpleEmbed({
                                desc: `Bonjour <@!${ticketData.creator}>, \n\nPouvons-nous encore vous aider ? \nSi nous n'obtenons pas de réponse dans les **24 heures**, nous fermerons ce ticket. \n\n- Équipe ${interaction.guild.name}`,
                                image: `https://i.imgur.com/IFqedKi.png`,
                                content: `<@!${ticketData.creator}>`,
                                type: type
                            }, interaction)
                        }
                        else {
                            client.errNormal({
                                error: "Ce n'est pas un ticket !",
                                type: type
                            }, interaction);

                        }
                    }
                    else {
                        return client.errNormal({
                            error: "Effectuez la configuration du ticket !",
                            image: `https://i.imgur.com/IFqedKi.png`,
                            type: type
                        }, interaction);
                    }
                })
            }
            else {
                return client.errNormal({
                    error: "Vous n'êtes pas autorisé à répondre à votre propre ticket !",
                    image: `https://i.imgur.com/IFqedKi.png`,
                    type: 'ephemeral'
                }, interaction)
            }
        }
    })
}