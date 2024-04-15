const Discord = require('discord.js');

module.exports = async (client) => {
    const fields = [
        { name: 'Activités', value: '</activities:1166900503444197466> Affiche les activités disponibles.', inline: true },
        { name: 'AFK', value: '</afk help:1108836553263939645> Gère votre statut AFK.', inline: true },
        { name: 'Auto modération', value: '</automod help:1166900503444197468> Configure les paramètres d\'auto-modération.', inline: true },
        { name: 'Configuration automatique', value: '</autosetup help:1166900503444197469> Configure automatiquement le bot.', inline: true },
        { name: 'Anniversaire', value: '</birthdays help:1166900503444197470> Gère les anniversaires des membres.', inline: true },
        { name: 'Bot', value: '</bot help:1166900503444197471> Affiche des informations sur le bot.', inline: true },
        { name: 'Configuration', value: '</config help:1166900503444197474> Configure les paramètres du bot.', inline: true },
        { name: 'Commandes personnalisées', value: '</custom-commands help:1166900503444197473> Crée des commandes personnalisées.', inline: true },
        { name: 'Famille', value: '`</family help:1166900503788142743> Gère les paramètres de la famille.', inline: true },
        { name: 'Jeux', value: '</games help:1166900503788142744> Accédez aux jeux disponibles.', inline: true },
        { name: 'Giveaway', value: '</giveaway help:1108836553423327348> Gère les giveaways dans le serveur.', inline: true },
        { name: 'Paramètres du serveur', value: '</guild help:1166900503788142745> Affiche les paramètres du serveur.', inline: true },
        { name: 'Invitations', value: '</invites help:1108836553423327350> Gère les invitations des membres.', inline: true },
        { name: 'Niveaux', value: '`</levels help:1166900503788142747> Gère le système de niveaux.', inline: true },
        { name: 'Messages', value: '</messages help:1166900503788142748> Affiche le nombre de messages envoyés.', inline: true },
        { name: 'Modération', value: '</moderation help:1166900503788142749> Accédez aux commandes de modération.', inline: true },
        { name: 'Bloc-notes', value: '</notepad help:1166900504253706270> Gère vos notes personnelles.', inline: true },
        { name: 'Profil', value: '</profile help:1166900504253706271> Affiche votre profil.', inline: true },
        { name: 'Rôles de réaction', value: '</reactionroles help:1166900504253706272> Configure les rôles à réaction.', inline: true },
        { name: 'Statistiques du serveur', value: '</serverstats help:1166900504253706273> Affiche les statistiques du serveur.', inline: true },
        { name: 'Configuration', value: '</setup help:1166900504253706274> Configure le bot.', inline: true },
        { name: 'Messages épinglés', value: '</stickymessages help:1166900504253706275> Gère les messages épinglés.', inline: true },
        { name: 'Suggestions', value: '</suggestions help:1166900504253706276> Gère les suggestions des membres.', inline: true },
        { name: 'Remerciements', value: '</thanks help:1166900504253706278> Envoie un remerciement à un autre membre.', inline: true },
        { name: 'Tickets', value: '</tickets help:1166900504253706279> Gère les tickets de support.', inline: true },
        { name: 'Outils', value: '</tools help:1166900504463413379> Affiche les outils disponibles.', inline: true },
        { name: 'Vocal', value: '</voice help:1166900504463413380> Gère les paramètres vocaux du serveur.', inline: true },
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
                            .setEmoji('1209945967382495242')
                            .setStyle(Discord.ButtonStyle.Secondary),

                        new Discord.ButtonBuilder()
                            .setCustomId('helpNext')
                            .setEmoji('1209945964962648177')
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
                    image: 'https://i.imgur.com/U9Fih4D.png',
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
                                    image: 'https://i.imgur.com/U9Fih4D.png',
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
                                    image: 'https://i.imgur.com/U9Fih4D.png',
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
