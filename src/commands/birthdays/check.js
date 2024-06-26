const Discord = require('discord.js');

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (!data) return client.errNormal({ 
            error: "Aucune date d'anniversaire trouvée !",
            type: 'editreply' 
        }, interaction);

        client.embed({ 
            title: `Vérification de l'anniversaire`, 
            desc: `L'anniversaire de ${interaction.user.username} est le ${data.Birthday}`,
            image: `https://i.imgur.com/IFqedKi.png`,
            type: 'editreply'
        }, interaction)
    })
}