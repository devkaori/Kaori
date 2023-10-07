const { CommandInteraction, Client, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: {
        name: 'calin',
        description: 'Fais un câlin à une personne avec un gif',
        options: [{
            name: 'user',
            type: 'USER',
            description: 'La personne à qui tu veux faire un câlin',
            required: true
        }]
    },

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        await interaction.deferReply({ fetchReply: true });

        const targetUser = interaction.options.getUser('user');
        
        try {
            const response = await axios.get('http://api.nekos.fun:8080/api/hug');
            const embed = new Discord.MessageEmbed()
                .setTitle(`${interaction.user.username} fait un câlin à ${targetUser.username}!`)
                .setImage(response.data.url)
                .setColor('#FFC0CB');

            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            interaction.editReply('Oups, il y a eu une erreur. Essaye plus tard!');
        }
    }
};
