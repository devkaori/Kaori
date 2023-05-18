const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');

    client.giveawaysManager.edit(messageID, {
        addTime: 5000,
    }).then(() => {
        const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
        client.succNormal({
            text: `Le giveaway sera mis à jour dans moins de ${numberOfSecondsMax} secondes`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Je ne peux pas trouver le giveaway pour ${messageID} !`,
            type: 'editreply'
        }, interaction);
    });
};