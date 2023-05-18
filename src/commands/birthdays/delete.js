const Discord = require('discord.js');

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (!data) return client.errNormal({ 
            error: "Aucune date d'anniversaire trouvée !",
            type: 'editreply' 
        }, interaction);

        Schema.findOneAndDelete({ Guild: interaction.guild.id, User: interaction.user.id }).then(() => {
            client.succNormal({ 
                text: "Votre date d'anniversaire a été supprimée", 
                type: 'editreply' 
            }, interaction)
        })
    })
}