const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "support-Bothelp") {
                interaction.deferUpdate();

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-helppanel')
                            .setPlaceholder('Aucune sélection')
                            .addOptions([
                                {
                                    label: `Commandes`,
                                    description: `Afficher les commandes de ${client.user.username} !`,
                                    emoji: "1209141526593142874",
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Inviter Kaori`,
                                    description: `Inviter ${client.user.username} sur votre serveur`,
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

                let row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Communauté")
                            .setURL(client.config.discord.serverInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                client.embed({
                    title: `Support`,
                    image: 'https://i.imgur.com/U9Fih4D.png',
                    desc: `Améliorez votre serveur avec ${client.user.username} !`,
                    url: client.config.discord.serverInvite,
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    }).setMaxListeners(0);
}
