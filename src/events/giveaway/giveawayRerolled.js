const Discord = require('discord.js');

module.exports = (client, giveaway, winners) => {
    winners.forEach((member) => {
        client.embed({
            title: `Le concours est terminé`,
            desc: `Félicitations ${member.user.username} ! Vous avez remporté le concours !`,
            fields: [
                {
                    name: `Prix`,
                    value: `${giveaway.prize}`,
                    inline: true
                },
                {
                    name: `Concours`,
                    value: `[Cliquez ici](https://discordapp.com/channels/${giveaway.message.guildId}/${giveaway.message.channelId}/${giveaway.message.id})`,
                    inline: true
                }
            ]
        
        }, member).catch(() => { });
    });
};