const Discord = require('discord.js');

module.exports = (client, giveaway, member, reaction) => {
    client.succNormal({
        text: `Votre participation à [ce concours](https://discordapp.com/channels/${giveaway.message.guildId}/${giveaway.message.channelId}/${giveaway.message.id}) a été approuvée.`
    }, member).catch(() => { });
};