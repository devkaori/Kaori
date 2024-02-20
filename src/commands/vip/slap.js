const fetch = require('node-fetch');

module.exports = async (client, interaction, args) => {
    await interaction.deferReply({ fetchReply: true });

    const response = await fetch('http://api.nekos.fun:8080/api/slap');
    const data = await response.json();

    const affectionPercentage = Math.floor(Math.random() * 100) + 1;

    const member = interaction.options.getMember('cible');

    if (member) {
        const embed = {
            color: 0x2C2D31,
            title: `Gifle`,
            description: `<:s_heart_devill_red:1194671427132063866> ${interaction.user} a mis une gifle à ${member}\n- Niveau de furiosité de ${affectionPercentage}%`,
            image: {
                url: data.image,
            },
        };

        return interaction.editReply({ embeds: [embed] });
    } else {
        interaction.reply({ content: '<:non:1161484000272060548> Veuillez mentionner un membre à qui mettre une gifle.', ephemeral: true });
    }
};