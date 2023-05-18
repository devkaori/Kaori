const Discord = require('discord.js');

module.exports = (client, player, track) => {
    player.destroy(player.guild.id);

    const channel = client.channels.cache.get(player.textChannel);
    client.errNormal({
        error: "La file d'attente est vide. Je quitte le canal vocal."
    }, channel);
};