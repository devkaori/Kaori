const Discord = require('discord.js');

module.exports = async (client) => {
    const fields = [
        {
            name: `Activités`,
            value: `\`/activities\``,
            inline: true
        },
        {
            name: `AFK`,
            value: `\`/afk help\``,
            inline: true
        },
        {
            name: `Annonce`,
            value: `\`/announce help\``,
            inline: true
        },
        {
            name: `Auto modération`,
            value: `\`/automod help\``,
            inline: true
        },
        {
            name: `Configuration automatique`,
            value: `\`/autosetup help\``,
            inline: true
        },
        {
            name: `Anniversaire`,
            value: `\`/birthdays help\``,
            inline: true
        },
        {
            name: `Bot`,
            value: `\`/bot help\``,
            inline: true
        },
        {
            name: `Casino`,
            value: `\`/casino help\``,
            inline: true
        },
        {
            name: `Configuration`,
            value: `\`/config help\``,
            inline: true
        },
        {
            name: `Commandes personnalisées`,
            value: `\`/custom-commands help\``,
            inline: true
        },
        {
            name: `Économie`,
            value: `\`/economy help\``,
            inline: true
        },
        {
            name: `Famille`,
            value: `\`/family help\``,
            inline: true
        },
        {
            name: `Jeux`,
            value: `\`/games help\``,
            inline: true
        },
        {
            name: `Giveaway`,
            value: `\`/giveaway help\``,
            inline: true
        },
        {
            name: `Paramètres du serveur`,
            value: `\`/guild help\``,
            inline: true
        },
        {
            name: `Invitations`,
            value: `\`/invites help\``,
            inline: true
        },
        {
            name: `Niveaux`,
            value: `\`/levels help\``,
            inline: true
        },
        {
            name: `Messages`,
            value: `\`/messages help\``,
            inline: true
        },
        {
            name: `Modération`,
            value: `\`/moderation help\``,
            inline: true
        },
        {
            name: `Bloc-notes`,
            value: `\`/notepad help\``,
            inline: true
        },
        {
            name: `Profil`,
            value: `\`/profile help\``,
            inline: true
        },
        {
            name: `Hug`,
            value: `\`/hug\``,
            inline: true
        },
        {
            name: `Kiss`,
            value: `\`/kiss\``,
            inline: true
        },
        {
            name: `Rôles de réaction`,
            value: `\`/reactionroles help\``,
            inline: true
        },
        {
            name: `Recherche`,
            value: `\`/search help\``,
            inline: true
        },
        {
            name: `Statistiques du serveur`,
            value: `\`/serverstats help\``,
            inline: true
        },
        {
            name: `Configuration`,
            value: `\`/setup help\``,
            inline: true
        },
        {
            name: `Messages épinglés`,
            value: `\`/stickymessages help\``,
            inline: true
        },
        {
            name: `Suggestions`,
            value: `\`/suggestions help\``,
            inline: true
        },
        {
            name: `Remerciements`,
            value: `\`/thanks help\``,
            inline: true
        },
        {
            name: `Tickets`,
            value: `\`/tickets help\``,
            inline: true
        },
        {
            name: `Outils`,
            value: `\`/tools help\``,
            inline: true
        },
        {
            name: `Vocal`,
            value: `\`/voice help\``,
            inline: true
        },
    ];

    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "commands-Bothelp") {
                interaction.deferUpdate();
                let page = 1;

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('helpPrev')
                            .setEmoji('1167580273442041949')
                            .setStyle(Discord.ButtonStyle.Secondary),

                        new Discord.ButtonBuilder()
                            .setCustomId('helpNext')
                            .setEmoji('1167580095049896008')
                            .setStyle(Discord.ButtonStyle.Secondary),

                        new Discord.ButtonBuilder()
                            .setLabel("Inviter")
                            .setURL(client.config.discord.botInvite)
                            .setStyle(Discord.ButtonStyle.Link),

                        new Discord.ButtonBuilder()
                            .setLabel("Communauté")
                            .setURL(client.config.discord.serverInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-helppanel')
                            .setPlaceholder('Aucune sélection')
                            .addOptions([
                                {
                                    label: `Commandes`,
                                    description: `Afficher les commandes du bot !`,
                                    emoji: "1163106294073401354",
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Invitation`,
                                    description: `Inviter le bot sur votre serveur`,
                                    emoji: "1163106292227915796",
                                    value: "invite-Bothelp",
                                },
                                {
                                    label: `Communauté`,
                                    description: `Rejoindre le serveur de support`,
                                    emoji: "1163106279187820544",
                                    value: "support-Bothelp",
                                },
                            ]),
                    );

                client.embed({
                    title: `Panneau d'aide`,
                    image: 'https://i.imgur.com/cNHAdGT.png',
                    fields: fields.slice(0, 24),
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message).then(msg => {
                    const filter = i => i.user.id === interaction.user.id;

                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 100000 });

                    collector.on('collect', async i => {
                        if (i.customId == "helpNext") {
                            if (page == 1) {
                                client.embed({
                                    title: `Panneau d'aide`,
                                    image: 'https://i.imgur.com/cNHAdGT.png',
                                    fields: fields.slice(25, 49),
                                    components: [row2, row],
                                    type: 'update'
                                }, i)
                                page += 1;
                            }
                        }

                        else if (i.customId == "helpPrev") {
                            if (page == 2) {
                                client.embed({
                                    title: `Panneau d'aide`,
                                    image: 'https://i.imgur.com/cNHAdGT.png',
                                    fields: fields.slice(0, 24),
                                    components: [row2, row],
                                    type: 'update'
                                }, i)
                                page -= 1;
                            }
                        }
                    });
                })
            }
        }
    }).setMaxListeners(0);
}
