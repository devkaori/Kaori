const Discord = require('discord.js');

module.exports = (client, giveaway, member, reaction) => {
    client.succNormal({
        text: `<:white_heart:1130912421213646908> Votre participation à [ce concours](https://discordapp.com/channels/${giveaway.message.guildId}/${giveaway.message.channelId}/${giveaway.message.id}) a été approuvée.`
    }, member).catch(() => { });
};
