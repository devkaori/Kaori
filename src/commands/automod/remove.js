const Discord = require('discord.js');

const Schema = require("../../database/models/blacklist");

module.exports = async (client, interaction, args) => {
    const word = interaction.options.getString('word');

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            if (!data.Words.includes(word)) {
                return client.errNormal({
                    error: `Ce mot n'existe pas dans la base de données !`,
                    image: `https://i.imgur.com/IFqedKi.png`,
                    type: 'editreply'
                }, interaction);
            }

            const filtered = data.Words.filter((target) => target !== word);

            await Schema.findOneAndUpdate({ Guild: interaction.guild.id }, {
                Guild: interaction.guild.id,
                Words: filtered
            });

            client.succNormal({
                text: `Le mot a été supprimé de la liste noire !`,
                image: `https://i.imgur.com/IFqedKi.png`,
                fields: [
                    {
                        name: `Mot`,
                        value: `${word}`
                    }
                ],
                type: 'editreply'
            }, interaction);
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