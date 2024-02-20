const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription(`Mettre une gifle à un autre membre`)
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre à qui Mettre une gifle')
                .setRequired(true)),

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });

        const response = await fetch('https://nekos.best/api/v2/slap');
        const data = await response.json();

        const affectionPercentage = Math.floor(Math.random() * 100) + 1;

        const member = interaction.options.getMember('membre');

        if (member) {
            const embed = {
                color: 0x2C2D31,
                title: `Calin`,
                description: `<:s_heart_devill_red:1194671427132063866> ${interaction.user} a mis une gifle à ${member}\n- Niveau de furiosité de ${affectionPercentage}%`,
                image: {
                    url: data.url,
                },
            };

            return interaction.editReply({ embeds: [embed] });
        } else {
            interaction.reply({ content: '<:non:1161484000272060548> Veuillez mentionner un membre à qui mettre une gifle.', ephemeral: true });
        }
    },
};