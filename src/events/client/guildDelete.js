const discord = require('discord.js');
const fs = require('fs');

const Schema = require("../../database/models/afk");
const Schema3 = require("../../database/models/customCommandAdvanced");
const Schema4 = require("../../database/models/birthday");
const Schema5 = require("../../database/models/blacklist");
const Schema6 = require("../../database/models/channelList");
const Schema8 = require("../../database/models/count");
const Schema9 = require("../../database/models/countChannel");
const Schema10 = require("../../database/models/customCommand");
const Schema13 = require("../../database/models/family");
const Schema14 = require("../../database/models/functions");
const Schema15 = require("../../database/models/guessNumber");
const Schema16 = require("../../database/models/guessWord");
const Schema17 = require("../../database/models/levelChannels");
const Schema18 = require("../../database/models/levelRewards");
const Schema19 = require("../../database/models/logChannels");
const Schema20 = require("../../database/models/messages");
const Schema23 = require("../../database/models/notes");
const Schema25 = require("../../database/models/privatechannels");
const Schema27 = require("../../database/models/reactionRoles");
const Schema28 = require("../../database/models/reviewChannels");
const Schema29 = require("../../database/models/stats");
const Schema30 = require("../../database/models/suggestionChannels");
const Schema31 = require("../../database/models/ticketChannels");
const Schema32 = require("../../database/models/ticketMessage");
const Schema34 = require("../../database/models/tickets");
const Schema35 = require("../../database/models/verify");
const Schema36 = require("../../database/models/voice");
const Schema37 = require("../../database/models/voiceChannels");
const Schema38 = require("../../database/models/warnings");
const Schema39 = require("../../database/models/wordsnake");
const Schema40 = require("../../database/models/messageRewards");

module.exports = async (client, guild) => {
    const kickLogs = new discord.WebhookClient({
        id: client.webhooks.serverLogs2.id,
        token: client.webhooks.serverLogs2.token,
    });

    if (guild.name == undefined) return;

    const promises = [
        client.shard.broadcastEval(client => client.guilds.cache.size),
        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
    ];
    Promise.all(promises)
        .then(async (results) => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);

            const embed = new discord.EmbedBuilder()
                .setTitle("Retiré d'un serveur !")
                .addFields(
                    { name: "Nombre total de serveurs :", value: `${totalGuilds}`, inline: true },
                    { name: "Nom du serveur", value: `${guild.name}`, inline: true },
                    { name: "ID du serveur", value: `${guild.id}`, inline: true },
                    { name: "Membres du serveur", value: `${guild.memberCount}`, inline: true },
                    { name: "Propriétaire du serveur", value: `<@!${guild.ownerId}> (${guild.ownerId})`, inline: true },
                )
                .setColor(client.config.colors.normal);
            kickLogs.send({
                username: 'Bot Logs',
                avatarURL: client.user.avatarURL(),
                embeds: [embed],
            });
        });

    await Schema.deleteMany({ Guild: guild.id });
    await Schema3.deleteMany({ Guild: guild.id });
    await Schema4.deleteMany({ Guild: guild.id });
    await Schema5.deleteMany({ Guild: guild.id });
    await Schema6.deleteMany({ Guild: guild.id });
    await Schema7.deleteMany({ Guild: guild.id });
    await Schema8.deleteMany({ Guild: guild.id });
    await Schema9.deleteMany({ Guild: guild.id });
    await Schema10.deleteMany({ Guild: guild.id });
    await Schema11.deleteMany({ Guild: guild.id });
    await Schema12.deleteMany({ Guild: guild.id });
    await Schema13.deleteMany({ Guild: guild.id });
    await Schema14.deleteMany({ Guild: guild.id });
    await Schema15.deleteMany({ Guild: guild.id });
    await Schema16.deleteMany({ Guild: guild.id });
    await Schema17.deleteMany({ Guild: guild.id });
    await Schema18.deleteMany({ Guild: guild.id });
    await Schema19.deleteMany({ Guild: guild.id });
    await Schema20.deleteMany({ Guild: guild.id });
    await Schema23.deleteMany({ Guild: guild.id });
    await Schema25.deleteMany({ Guild: guild.id });
    await Schema27.deleteMany({ Guild: guild.id });
    await Schema28.deleteMany({ Guild: guild.id });
    await Schema29.deleteMany({ Guild: guild.id });
    await Schema30.deleteMany({ Guild: guild.id });
    await Schema31.deleteMany({ Guild: guild.id });
    await Schema32.deleteMany({ Guild: guild.id });
    await Schema34.deleteMany({ Guild: guild.id });
    await Schema35.deleteMany({ Guild: guild.id });
    await Schema36.deleteMany({ Guild: guild.id });
    await Schema37.deleteMany({ Guild: guild.id });
    await Schema38.deleteMany({ Guild: guild.id });
    await Schema39.deleteMany({ Guild: guild.id });
    await Schema40.deleteMany({ Guild: guild.id });
};
