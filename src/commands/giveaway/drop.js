const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const gchannel = interaction.options.getChannel('channel');
    const duration = interaction.options.getString('duration');
    const winnerCount = interaction.options.getNumber('winners');
    const prize = interaction.options.getString('prize');

    client.giveawaysManager.start(gchannel, {
        duration: ms(duration),
        prize: `${prize}`,
        lastChance: {
            enabled: true,
            content: `**DERNIÈRE CHANCE DE PARTICIPER !** ${client.emotes.normal.error}`,
            threshold: 5000,
            embedColor: '#FF0000'
        },
        pauseOptions: {
            isPaused: true,
            content: '**CE GIVEAWAY EST EN PAUSE !**',
            unPauseAfter: null,
            embedColor: '#FFFF00'
        },
        winnerCount: parseInt(winnerCount),
        hostedBy: interaction.user,
        thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
        isDrop: true,
        messages: {
            giveaway: `**GIVEAWAY**`,
            giveawayEnded: `**GIVEAWAY TERMINÉ**`,
            drawing: `Se termine le : **{timestamp}** !`,
            dropMessage: `Soyez le premier à réagir avec 🥳`,
            winMessage: "Félicitations {winners} ! Vous venez de gagner **{this.prize}** !",
            embedFooter: "Giveaway !",
            embedColor: client.config.colors.normal,
            noWinner: "Giveaway annulé, pas assez de participants. \n",
            hostedBy: `Organisé par : {this.hostedBy}`,
            winners: `Gagnant(s)`,
            endedAt: "Se termine le :",
            units: {
                seconds: "secondes",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: false
            },
        },
    }).then((gData) => {
        client.succNormal({ 
            text: `Giveaway commencé dans ${gchannel}`,
            type: 'ephemeraledit'
        }, interaction);
    });
};