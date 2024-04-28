const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');

    client.giveawaysManager.edit(messageID, {
        setEndTimestamp: Date.now()
    }).then(() => {
        client.succNormal({
            text: `Le giveaway se terminera dans moins de ${client.giveawaysManager.options.updateCountdownEvery / 1000} secondes`,
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