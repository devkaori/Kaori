const Discord = require('discord.js');

module.exports = (client, player, track) => {
    let row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setEmoji(client.emotes.music.previous)
                .setCustomId("Bot-musicprev")
                .setStyle(Discord.Constants.MessageButtonStyles.SECONDARY),

            new Discord.MessageButton()
                .setEmoji(client.emotes.music.pause)
                .setCustomId("Bot-musicpause")
                .setStyle(Discord.Constants.MessageButtonStyles.SECONDARY),

            new Discord.MessageButton()
                .setEmoji(client.emotes.music.stop)
                .setCustomId("Bot-musicstop")
                .setStyle(Discord.Constants.MessageButtonStyles.SECONDARY),

            new Discord.MessageButton()
                .setEmoji(client.emotes.music.next)
                .setCustomId("Bot-musicnext")
                .setStyle(Discord.Constants.MessageButtonStyles.SECONDARY),
        );

    const channel = client.channels.cache.get(player.textChannel);

    client.embed({
        title: `${client.emotes.normal.music}・${track.title}`,
        url: track.uri,
        desc: `La musique a commencé dans <#${player.voiceChannel}> !`,
        thumbnail: track.thumbnail,
        fields: [
            {
                name: `Demandé par`,
                value: `${track.requester}`,
                inline: true
            },
            {
                name: `Se termine à`,
                value: `<t:${((Date.now() / 1000) + (track.duration / 1000)).toFixed(0)}:f>`,
                inline: true
            },
            {
                name: `Auteur`,
                value: `${track.author}`,
                inline: true
            }
        ],
        components: [row],
    }, channel);
};
