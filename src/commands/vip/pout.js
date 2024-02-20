const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    await interaction.deferReply({ fetchReply: true });

    const response = await fetch('http://nekos.best/api/v2/pout');
    const data = await response.json();

    const affectionPercentage = Math.floor(Math.random() * 100) + 1;

    const member = interaction.options.getMember('membre');

    if (member) {
        const embed = {
            color: 0x2C2D31,
            title: `Calin`,
            description: `<:s_heart_devill_red:1194671427132063866> ${interaction.user} boude ${member}`,
            image: {
                url: data.url,
            },
        };

        return interaction.editReply({ embeds: [embed] });
    } else {
        interaction.reply({ content: '<:non:1161484000272060548> Veuillez mentionner un membre à qui bouder.', ephemeral: true });
    }
};