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
            content: `**DERNIÈRE CHANCE POUR PARTICIPER !** ${client.emotes.normal.error}`,
            threshold: 5000,
            embedColor: '#FF0000'
        },
        pauseOptions: {
            isPaused: false,
            content: '**CE GIVEAWAY EST EN PAUSE !**',
            unPauseAfter: null,
            embedColor: '#FFFF00'
        },
        winnerCount: parseInt(winnerCount),
        hostedBy: interaction.user,
        thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
        messages: {
            giveaway: `**GIVEAWAY**`,
            giveawayEnded: `**GIVEAWAY TERMINÉ**`,
            drawing: `Se termine le : **{timestamp}** !`,
            inviteToParticipate: "Réagissez avec la réaction pour participer au giveaway ! \n",
            winMessage: "Félicitations {winners} ! Vous venez de remporter **{this.prize}** !",
            embedFooter: "Giveaway !",
            embedColor: client.config.colors.normal,
            noWinner: "Giveaway annulé, pas assez de participants. \n",
            hostedBy: `${client.emotes.normal.party} - Organisé par : {this.hostedBy}`,
            winners: `Gagnant(s)`,
            endedAt: "Se termine à :",
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
            text: `Giveaway lancé dans ${gchannel}`,
            type: 'ephemeraledit'
        }, interaction);
    });
};