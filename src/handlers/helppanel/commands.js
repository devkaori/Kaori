const Discord = require('discord.js');

module.exports = async (client) => {
    const commands = [
        { name: 'Activités', description: '/activities', inline: true },
        { name: 'AFK', description: '/afk help', inline: true },
        { name: 'Annonce', description: '/announce help', inline: true },
        { name: 'Auto modération', description: '/automod help', inline: true },
        { name: 'Configuration automatique', description: '/autosetup help', inline: true },
        { name: 'Anniversaire', description: '/birthdays help', inline: true },
        { name: 'Bot', description: '/bot help', inline: true },
        { name: 'Casino', description: '/casino help', inline: true },
        { name: 'Configuration', description: '/config help', inline: true },
        { name: 'Commandes personnalisées', description: '/custom-commands help', inline: true },
        { name: 'Économie', description: '/economy help', inline: true },
        { name: 'Famille', description: '/family help', inline: true },
        { name: 'Jeux', description: '/games help', inline: true },
        { name: 'Giveaway', description: '/giveaway help', inline: true },
        { name: 'Paramètres du serveur', description: '/guild help', inline: true },
        { name: 'Invitations', description: '/invites help', inline: true },
        { name: 'Niveaux', description: '/levels help', inline: true },
        { name: 'Messages', description: '/messages help', inline: true },
        { name: 'Modération', description: '/moderation help', inline: true },
        { name: 'Bloc-notes', description: '/notepad help', inline: true },
        { name: 'Profil', description: '/profile help', inline: true },
        { name: 'Hug', description: '/hug', inline: true },
        { name: 'Kiss', description: '/kiss', inline: true },
        { name: 'Rôles de réaction', description: '/reactionroles help', inline: true },
        { name: 'Recherche', description: '/search help', inline: true },
        { name: 'Statistiques du serveur', description: '/serverstats help', inline: true },
        { name: 'Configuration', description: '/setup help', inline: true },
        { name: 'Messages épinglés', description: '/stickymessages help', inline: true },
        { name: 'Suggestions', description: '/suggestions help', inline: true },
        { name: 'Remerciements', description: '/thanks help', inline: true },
        { name: 'Tickets', description: '/tickets help', inline: true },
        { name: 'Outils', description: '/tools help', inline: true },
        { name: 'Vocal', description: '/voice help', inline: true },
    ];

    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel" && interaction.values == "commands-Bothelp") {
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

            const updateHelpPanel = async () => {
                client.embed({
                    title: `Panneau d'aide`,
                    image: 'https://i.imgur.com/cNHAdGT.png',
                    fields: commands.slice((page - 1) * 24, page * 24),
                    components: [row2, row],
                    type: 'update'
                }, interaction.message);
            };

            const collector = interaction.channel.createMessageComponentCollector({
                filter: i => i.user.id === interaction.user.id,
                time: 100000
            });

            collector.on('collect', async i => {
                if (i.customId == "helpNext" && page * 24 < commands.length) {
                    page++;
                    updateHelpPanel();
                } else if (i.customId == "helpPrev" && page > 1) {
                    page--;
                    updateHelpPanel();
                }
            });

            updateHelpPanel();
        }
    }).setMaxListeners(0);
};
