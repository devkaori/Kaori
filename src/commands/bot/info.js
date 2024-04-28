const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const promises = [
        client.shard.broadcastEval(client => client.guilds.cache.size),
        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        client.shard.broadcastEval(client => client.channels.cache.size),
        client.shard.broadcastEval(client => client.voice.adapters.size)
    ];
    return Promise.all(promises)
        .then(async results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
            const totalVoice = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);

            const duration = moment.duration(client.uptime).format("\`D\` [jours], \`H\` [heures], \`m\` [minutes], \`s\` [secondes]");

            client.embed({
                title: `Informations sur le bot`,
                desc: `Informations concernant le bot`,
                image: `https://i.imgur.com/IFqedKi.png`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                fields: [
               {
                    name: "Informations",
                    value: "Bot est un bot avec lequel vous pouvez gérer l'ensemble de votre serveur ! Avec pas moins de 350+ commandes, nous avons un bot complet avec de nombreuses options pour améliorer votre serveur !",
                    inline: false,
                },
                {
                    name: "Général",
                    value: `Information Général`,
                    inline: false,
                },
                {
                    name: "Nom du bot",
                    value: `${client.user.username}`,
                    inline: true,
                },
                {
                    name: "ID du bot",
                    value: `${client.user.id}`,
                    inline: true,
                },
                {
                    name: "Shards",
                    value: `\`${client.options.shardCount}\` shards`,
                    inline: true,
                },
                {
                    name: "Propriétaire du bot",
                    value: `**Masha**`,
                    inline: true,
                },
                {
                    name: "Développeur du bot",
                    value: "**Nathan, Frost**",
                    inline: true,
                },
                {
                    name: "Commandes",
                    value: `\`${client.commands.size}\` commandes`,
                    inline: true,
                },
                {
                    name: "Serveurs",
                    value: `\`${totalGuilds}\` serveurs`,
                    inline: true,
                },
                {
                    name: "Serveurs de ce shard",
                    value: `\`${client.guilds.cache.size}\` serveurs`,
                    inline: true,
                },
                {
                    name: "Membres",
                    value: `\`${totalMembers}\` membres`,
                    inline: true,
                },
                {
                    name: "Canaux vocaux connectés",
                    value: `\`${totalVoice}\` canaux`,
                    inline: true,
                },
                {
                    name: "Canaux",
                    value: `\`${totalChannels}\` canaux`,
                    inline: true,
                },
                {
                    name: "Créé le",
                    value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },

                {
                    name: "Système",
                    value: `Information Système`,
                    inline: false,
                },
                {
                    name: "Temps d'activité",
                    value: `${duration}`,
                    inline: true,
                },
                {
                    name: "Vitesse de l'API",
                    value: `\`${client.ws.ping}\`ms`,
                    inline: true,
                },
                {
                    name: "Version de Node.js",
                    value: `\`${process.version}\``,
                    inline: true,
                },
                {
                    name: "Version de Discord.js",
                    value: `\`${Discord.version}\``,
                    inline: true,
                },
                {
                    name: "Mémoire du bot",
                    value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` Mo`,
                    inline: true,
                },
                {
                    name: "Liens",
                    value: "Ajoutez-moi : [Cliquez ici](Lien_d'invitation_du_bot) \nServeur de support : [[ICI]](Lien_d'invitation_du_serveur)",
                    inline: false,
                }],
                type: 'editreply'
            }, interaction)
        })
}