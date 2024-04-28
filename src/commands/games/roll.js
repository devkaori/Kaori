const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 6);

    client.embed({
        title: `Lancer de dés`,
        desc: `Vous avez obtenu ${result}`,
        image: `https://i.imgur.com/IFqedKi.png`,
        type: 'editreply'
    }, interaction);
}
