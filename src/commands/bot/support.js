const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("Kaori Café")
                .setURL('https://discord.gg/7S28GvPsZQ')
                .setStyle(Discord.ButtonStyle.Link),
        );

    client.embed({
        title: `Serveur Communautaire`,
        desc: `Rejoignez la communauté officielle de Kaori ! Vous pourrez y demander de l'aide et bien plus encore.`,
        image: `https://i.imgur.com/IFqedKi.png`,
        url: `https://discord.gg/7S28GvPsZQ`,
        image: `https://i.imgur.com/sLfAMyf.jpg`,
        components: [row],
        type: 'editreply'
    }, interaction)
}
