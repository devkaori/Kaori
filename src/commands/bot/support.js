const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("Serveur de support")
                .setURL(client.config.discord.serverInvite)
                .setStyle(Discord.ButtonStyle.Link),
        );

    client.embed({
        title: `❓・Support`,
        desc: `Améliorez votre serveur avec Bot !`,
        url: client.config.discord.serverInvite,
        components: [row],
        type: 'editreply'
    }, interaction)
}