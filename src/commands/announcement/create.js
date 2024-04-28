const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel');

    client.embed({ 
        title: `Annonce !`, 
        desc: message 
    }, channel);

    client.succNormal({
        text: `L'annonce a été envoyée avec succès !`,
        image: `https://i.imgur.com/IFqedKi.png`,
        fields: [
            {
                name: `Canal`,
                value: `${channel} (${channel.name})`
            }
        ],
        type: 'editreply'
    }, interaction);
};