const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');

    client.giveawaysManager.delete(messageID).then(() => {
        client.succNormal({
            text: `Le giveaway a été supprimé avec succès`,
            image: `https://i.imgur.com/IFqedKi.png`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Je ne peux pas trouver le giveaway pour ${messageID} !`,
            image: `https://i.imgur.com/IFqedKi.png`,
            type: 'editreply'
        }, interaction);
    });
};