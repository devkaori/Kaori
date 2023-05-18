const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');

    client.giveawaysManager.reroll(messageID).then(() => {
        client.succNormal({ 
            text: `Nouveau tirage du giveaway effectué`, 
            type: 'editreply' 
        }, interaction);
    }).catch((err) => {
        client.errNormal({ 
            error: `Je ne peux pas trouver le giveaway pour ${messageID} !`, 
            type: 'editreply' 
        }, interaction);
    });
};