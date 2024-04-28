const Discord = require('discord.js');

const Schema = require("../../database/models/blacklist");

module.exports = async (client, interaction, args) => {
    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data && data.Words.length > 0) {
            client.embed({
                title: "Mots en liste noire",
                desc: data.Words.join(", "),
                image: `https://i.imgur.com/IFqedKi.png`,
                type: 'editreply'
            }, interaction)
        }
        else {
            client.errNormal({
                error: `Ce serveur n'a pas de données !`,
                image: `https://i.imgur.com/IFqedKi.png`,
                type: 'editreply'
            }, interaction);
        }
    })
}