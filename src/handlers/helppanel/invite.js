const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "invite-Bothelp") {
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
                                    emoji: "1163106294073401354",
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Invitation`,
                                    description: `Inviter ${client.user.username} sur votre serveur`,
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

                let row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Inviter")
                            .setURL(client.config.discord.botInvite)
                            .setStyle(Discord.ButtonStyle.Link),

                        new Discord.ButtonBuilder()
                            .setLabel("Serveur de support")
                            .setURL(client.config.discord.serverInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                client.embed({
                    title: `Invitation`,
                    desc: `Améliorez votre serveur avec le bot ${client.user.username} !`,
                    url: client.config.discord.botInvite,
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    }).setMaxListeners(0);
}
