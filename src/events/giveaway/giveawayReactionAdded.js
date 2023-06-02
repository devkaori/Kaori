const Discord = require('discord.js');

module.exports = (client, giveaway, member, reaction) => {
    client.succNormal({
        text: `<:icons_gift:1114165331213172796> Votre participation à [ce concours](https://discordapp.com/channels/${giveaway.message.guildId}/${giveaway.message.channelId}/${giveaway.message.id}) a été approuvée.`
    }, member).catch(() => { });
};
