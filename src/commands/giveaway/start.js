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
            content: `<a:yui_worry:1163075458674479275> **DERNIÈRE CHANCE POUR PARTICIPER !**`,
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
        messages: {
            giveaway: `**GIVEAWAY**`,
            giveawayEnded: `**GIVEAWAY TERMINÉ**`,
            drawing: ` - Se termine le : **{timestamp}** !`,
            inviteToParticipate: "- <a:mugi_flex:1163075337832366080> Réagissez avec la réaction pour participer au giveaway ! \n",
            winMessage: "<a:mugi_flex:1163075337832366080> Félicitations {winners} ! Vous venez de remporter **{this.prize}** !",
            embedFooter: "Giveaway !",
            embedColor: client.config.colors.normal,
            noWinner: "- <:icons_tada:1114165284127916072> Giveaway annulé, pas assez de participants. \n",
            hostedBy: `- <:mugi_approved:1163106289249964103> Organisé par : {this.hostedBy}`,
            winners: `Gagnant(s)`,
            endedAt: "<:mugi:1163106294073401354> Se termine à :",
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
            text: `- <a:yui_peek:1163075456866734090> Giveaway lancé dans ${gchannel}`,
            type: 'ephemeraledit'
        }, interaction);
    });
};
