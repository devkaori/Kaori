const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');

    client.giveawaysManager.delete(messageID).then(() => {
        client.succNormal({
            text: `Le giveaway a été supprimé avec succès`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Je ne peux pas trouver le giveaway pour ${messageID} !`,
            type: 'editreply'
        }, interaction);
    });
};