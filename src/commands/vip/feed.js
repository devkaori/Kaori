const fetch = require('node-fetch');

module.exports = async (client, interaction, args) => {

    const response = await fetch('http://api.nekos.fun:8080/api/pat');
    const data = await response.json();

    const affectionPercentage = Math.floor(Math.random() * 100) + 1;

    const member = interaction.options.getMember('cible');

    if (member) {
        const embed = {
            color: 0xFFA1A1,
            title: `Feed`,
            description: `<:s_heart_devill_red:1194671427132063866> ${interaction.user} nourrit ${member}\n- Niveau de faim de ${affectionPercentage}%`,
            image: {
                url: data.image,
            },
        };

        return interaction.editReply({ embeds: [embed] });
    } else {
        interaction.reply({ content: '<:non:1161484000272060548> Veuillez mentionner un membre à qui nourir.', ephemeral: true });
    }
}