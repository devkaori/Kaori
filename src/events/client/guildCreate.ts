import Discord from 'discord.js';
import Functions from '../../database/models/functions';

export default async (client: any, guild: any) => {
    const webhookClient = new Discord.WebhookClient({
        id: client.webhooks.serverLogs.id,
        token: client.webhooks.serverLogs.token,
    });

    if (guild == undefined) return;

    new Functions({
        Guild: guild.id,
        Prefix: client.config.discord.prefix
    }).save();

    try {
        const promises = [
            client.shard.broadcastEval((client: any) => client.guilds.cache.size),
            client.shard.broadcastEval((client: any) => client.guilds.cache.reduce((acc: any, guild: any) => acc + guild.memberCount, 0)),
        ];

        Promise.all(promises)
            .then(async (results) => {
                const totalGuilds = results[0].reduce((acc: any, guildCount: any) => acc + guildCount, 0);
                const embed = new Discord.EmbedBuilder()
                    .setTitle("Ajouté à un nouveau serveur !")
                    .addFields(
                        { name: "Nombre total de serveurs :", value: `${totalGuilds}`, inline: true },
                        { name: "Nom du serveur", value: `${guild.name}`, inline: true },
                        { name: "ID du serveur", value: `${guild.id}`, inline: true },
                        { name: "Membres du serveur", value: `${guild.memberCount}`, inline: true },
                        { name: "Propriétaire du serveur", value: `<@!${guild.ownerId}> (${guild.ownerId})`, inline: true },
                    )
                    .setColor(client.config.colors.normal);

                webhookClient.send({
                    username: 'Bot Logs',
                    avatarURL: client.user.avatarURL(),
                    embeds: [embed],
                });
            });

        let defaultChannel = "";
        guild.channels.cache.forEach((channel: any) => {
            if (channel.type == Discord.ChannelType.GuildText && defaultChannel == "") {
                if (channel.permissionsFor(guild.members.me).has(Discord.PermissionFlagsBits.SendMessages)) {
                    defaultChannel = channel;
                }
            }
        });

        let row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Inviter")
                    .setURL(client.config.discord.botInvite)
                    .setStyle("LINK"),

                new Discord.ButtonBuilder()
                    .setLabel("Serveur de support")
                    .setURL(client.config.discord.serverInvite)
                    .setStyle("LINK"),
            );

        client.embed({
            title: "Merci d'avoir invité le bot !",
            fields: [
                {
                    name: "Comment configurer ?",
                    value: 'Le préfixe par défaut est `/`. Pour exécuter les configurations avec le bot, utilisez `/setup`',
                    inline: false,
                },
                {
                    name: "J'ai besoin d'aide, que faire maintenant ?",
                    value: `Vous pouvez envoyer un message privé à Masha#100 pour obtenir de l'aide ou rejoindre le [serveur de support](${client.config.discord.serverInvite})`,
                    inline: false,
                },
                {
                    name: "Quelles sont les commandes disponibles ?",
                    value: 'Consultez la liste des commandes en utilisant `/help`',
                    inline: false,
                },
                {
                    name: "Inviter le bot !",
                    value: `Invitez le bot en cliquant [ici](${client.config.discord.botInvite})`,
                    inline: false,
                },
            ],
            components: [row],
        }, defaultChannel);
    } catch (err) {
        console.log(err);
    }
};