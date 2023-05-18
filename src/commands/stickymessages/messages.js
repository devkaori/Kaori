const Discord = require('discord.js');
const Schema = require("../../database/models/stickymessages");

module.exports = async (client, interaction, args) => {
    const data = await Schema.find({ Guild: interaction.guild.id });

    if (data && data.length > 0) {
        let list = '';

        for (let i = 0; i < data.length; i++) {
            list += `**${i + 1}** - Canal: ${data[i].Channel}\n`;
        }

        await client.embed({ 
            title: 'Messages collants',
            desc: list,
            type: 'editreply' 
        }, interaction);
    }
    else {
        client.errNormal({ 
            error: 'Aucune donnée trouvée !',
            type: 'editreply' 
        }, interaction);
    }
};
