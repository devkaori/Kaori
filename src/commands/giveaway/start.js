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
            content: `**DERNIÈRE CHANCE POUR PARTICIPER !**`,
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
            inviteToParticipate: "- <:icons_gift:1114165331213172796> Réagissez avec la réaction pour participer au giveaway ! \n",
            winMessage: "Félicitations {winners} ! Vous venez de remporter **{this.prize}** !",
            embedFooter: "Giveaway !",
            embedColor: client.config.colors.normal,
            noWinner: "- <:icons_tada:1114165284127916072> Giveaway annulé, pas assez de participants. \n",
            hostedBy: `- <:icons_tada:1114165284127916072> Organisé par : {this.hostedBy}`,
            winners: `<:icons_gift:1114165331213172796> Gagnant(s)`,
            endedAt: "<:icons_announce:1114165367607152660> Se termine à :",
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
            text: `- <:icons_awardcup:1114165417238347866> Giveaway lancé dans ${gchannel}`,
            type: 'ephemeraledit'
        }, interaction);
    });
};
