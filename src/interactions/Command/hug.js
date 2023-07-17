const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Fait un câlin à un utilisateur')
        .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true)),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('utilisateur');
        
        try {
            const response = await axios.get('http://api.nekos.fun:8080/api/hug');
            const imageUrl = response.data.url;
            
            const embed = new EmbedBuilder()
                .setColor('#ff9f43')
                .setDescription(`${interaction.user} fait un câlin à ${user} ❤️`)
                .setImage(imageUrl)
                .setFooter('Image fournie par nekos.fun');
            
            await interaction.followUp({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'image de câlin :', error);
            await interaction.followUp('Désolé, une erreur s\'est produite lors de la commande. Veuillez réessayer plus tard.');
        }
    },
};
