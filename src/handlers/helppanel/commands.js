const Discord = require('discord.js');

module.exports = async (client) => {
    const fields = [
        { name: 'Activités', value: '`/activities` Affiche les activités disponibles.', inline: true },
        { name: 'AFK', value: '`/afk help` Gère votre statut AFK.', inline: true },
        { name: 'Annonce', value: '`/announce help` Gère les annonces dans le serveur.', inline: true },
        { name: 'Auto modération', value: '`/automod help` Configure les paramètres d\'auto-modération.', inline: true },
        { name: 'Configuration automatique', value: '`/autosetup help` Configure automatiquement le bot.', inline: true },
        { name: 'Anniversaire', value: '`/birthdays help` Gère les anniversaires des membres.', inline: true },
        { name: 'Bot', value: '`/bot help` Affiche des informations sur le bot.', inline: true },
        { name: 'Casino', value: '`/casino help` Accédez aux jeux de casino.', inline: true },
        { name: 'Configuration', value: '`/config help` Configure les paramètres du bot.', inline: true },
        { name: 'Commandes personnalisées', value: '`/custom-commands help` Crée des commandes personnalisées.', inline: true },
        { name: 'Économie', value: '`/economy help` Accédez aux fonctionnalités d\'économie.', inline: true },
        { name: 'Famille', value: '`/family help` Gère les paramètres de la famille.', inline: true },
        { name: 'Jeux', value: '`/games help` Accédez aux jeux disponibles.', inline: true },
        { name: 'Giveaway', value: '`/giveaway help` Gère les giveaways dans le serveur.', inline: true },
        { name: 'Paramètres du serveur', value: '`/guild help` Affiche les paramètres du serveur.', inline: true },
        { name: 'Invitations', value: '`/invites help` Gère les invitations des membres.', inline: true },
        { name: 'Niveaux', value: '`/levels help` Gère le système de niveaux.', inline: true },
        { name: 'Messages', value: '`/messages help` Affiche le nombre de messages envoyés.', inline: true },
        { name: 'Modération', value: '`/moderation help` Accédez aux commandes de modération.', inline: true },
        { name: 'Bloc-notes', value: '`/notepad help` Gère vos notes personnelles.', inline: true },
        { name: 'Profil', value: '`/profile help` Affiche votre profil.', inline: true },
        { name: 'Hug', value: '`/hug` Envoyez un câlin à un autre membre.', inline: true },
        { name: 'Kiss', value: '`/kiss` Envoyez un baiser à un autre membre.', inline: true },
        { name: 'Rôles de réaction', value: '`/reactionroles help` Configure les rôles de réaction.', inline: true },
        { name: 'Recherche', value: '`/search help` Effectue une recherche sur le serveur.', inline: true },
        { name: 'Statistiques du serveur', value: '`/serverstats help` Affiche les statistiques du serveur.', inline: true },
        { name: 'Configuration', value: '`/setup help` Configure le bot.', inline: true },
        { name: 'Messages épinglés', value: '`/stickymessages help` Gère les messages épinglés.', inline: true },
        { name: 'Suggestions', value: '`/suggestions help` Gère les suggestions des membres.', inline: true },
        { name: 'Remerciements', value: '`/thanks help` Envoie un remerciement à un autre membre.', inline: true },
        { name: 'Tickets', value: '`/tickets help` Gère les tickets de support.', inline: true },
        { name: 'Outils', value: '`/tools help` Affiche les outils disponibles.', inline: true },
        { name: 'Vocal', value: '`/voice help` Gère les paramètres vocaux du serveur.', inline: true },
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
                                    emoji: "1209141526593142874",
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Invitation`,
                                    description: `Inviter le bot sur votre serveur`,
                                    emoji: "1209143065655115786",
                                    value: "invite-Bothelp",
                                },
                                {
                                    label: `Communauté`,
                                    description: `Rejoindre le serveur de support`,
                                    emoji: "1209141523887955999",
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
