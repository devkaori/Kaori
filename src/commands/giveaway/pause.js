const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');

    client.giveawaysManager.pause(messageID).then(() => {
        client.succNormal({ 
            text: `Giveaway en pause !`, 
            type: 'editreply' 
        }, interaction);
    }).catch((err) => {
        client.errNormal({ 
            error: `Je ne peux pas trouver le giveaway pour ${messageID} !`, 
            type: 'editreply' 
        }, interaction);
    });
};