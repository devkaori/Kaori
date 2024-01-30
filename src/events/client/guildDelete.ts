import Discord from 'discord.js';
import Schema from '../../database/models/afk';
import Schema3 from '../../database/models/customCommandAdvanced';
import Schema4 from '../../database/models/birthday';
import Schema5 from '../../database/models/blacklist';
import Schema6 from '../../database/models/channelList';
import Schema7 from '../../database/models/chatbot-channel';
import Schema8 from '../../database/models/count';
import Schema9 from '../../database/models/countChannel';
import Schema10 from '../../database/models/customCommand';
import Schema11 from '../../database/models/economy';
import Schema12 from '../../database/models/economyTimeout';
import Schema13 from '../../database/models/family';
import Schema14 from '../../database/models/functions';
import Schema15 from '../../database/models/guessNumber';
import Schema16 from '../../database/models/guessWord';
import Schema17 from '../../database/models/levelChannels';
import Schema18 from '../../database/models/levelRewards';
import Schema19 from '../../database/models/logChannels';
import Schema20 from '../../database/models/messages';
import Schema23 from '../../database/models/notes';
import Schema25 from '../../database/models/privatechannels';
import Schema27 from '../../database/models/reactionRoles';
import Schema28 from '../../database/models/reviewChannels';
import Schema29 from '../../database/models/stats';
import Schema30 from '../../database/models/suggestionChannels';
import Schema31 from '../../database/models/ticketChannels';
import Schema32 from '../../database/models/ticketMessage';
import Schema34 from '../../database/models/tickets';
import Schema35 from '../../database/models/verify';
import Schema36 from '../../database/models/voice';
import Schema37 from '../../database/models/voiceChannels';
import Schema38 from '../../database/models/warnings';
import Schema39 from '../../database/models/wordsnake';
import Schema40 from '../../database/models/messageRewards';

export default async (client: any, guild: any) => {
    const kickLogs = new Discord.WebhookClient({
        id: client.webhooks.serverLogs2.id,
        token: client.webhooks.serverLogs2.token,
    });

    if (guild.name == undefined) return;

    const promises = [
        client.shard.broadcastEval((client: any) => client.guilds.cache.size),
        client.shard.broadcastEval((client: any) => client.guilds.cache.reduce((acc: any, guild: any) => acc + guild.memberCount, 0)),
    ];
    
    Promise.all(promises)
        .then(async (results) => {
            const totalGuilds = results[0].reduce((acc: any, guildCount: any) => acc + guildCount, 0);

            const embed = new Discord.ButtonBuilder()
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