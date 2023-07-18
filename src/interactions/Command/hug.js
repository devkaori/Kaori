const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Faites un câlin à quelqu\'un')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur à qui vous voulez faire un câlin')
                .setRequired(true)),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('utilisateur');
        const author = interaction.user;

        try {
            const response = await fetch('	http://api.nekos.fun:8080/api/hug');
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setDescription(`${author} fait un câlin à ${user} ❤️`)
                .setImage(data.image);

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply('Une erreur s\'est produite lors de la récupération de l\'image de câlin.');
        }
    },
};
