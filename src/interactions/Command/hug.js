const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription(`Faire un câlin à un autre membre`)
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre à câliner')
                .setRequired(true)),

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });

        const response = await fetch('http://api.nekos.fun:8080/api/hug');
        const data = await response.json();

        const member = interaction.options.getMember('membre');

        if (member) {
            const embed = {
                color: client.config.colors.normal,
                title: `Câlin ❤️`,
                description: `<a:yuiazu_cuddle:1163075413598285954> ${interaction.user} fait un câlin à ${member}`,
                image: {
                    url: data.image,
                },
            };

            return interaction.editReply({ embeds: [embed] });
        } else {
            interaction.reply({ content: '<:non:1161484000272060548> Veuillez mentionner un membre à câliner.', ephemeral: true });
        }
    },
};
