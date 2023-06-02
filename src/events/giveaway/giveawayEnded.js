const Discord = require('discord.js');

module.exports = (client, giveaway, winners) => {
    winners.forEach((member) => {
        client.embed({
            title: `Concours terminé`,
            desc: `- <:icons_announce:1114165367607152660> Félicitations ${member.user.username} ! Vous avez remporté le concours !`,
            fields: [
                {
                    name: `<:icons_gift:1114165331213172796> Prix`,
                    value: `<:Icon_Arrow_Right:1114167654777888798> ${giveaway.prize}`,
                    inline: true
                },
                {
                    name: `<:icons_tada:1114165284127916072> Concours`,
                    value: `<:Icon_Arrow_Right:1114167654777888798> [Cliquez ici](https://discordapp.com/channels/${giveaway.message.guildId}/${giveaway.message.channelId}/${giveaway.message.id})`,
                    inline: true
                }
            ]
        
        }, member).catch(() => { });
    });
};
