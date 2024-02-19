const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-linkspanel") {
            if (interaction.values == "invite-linkspanel") {
                interaction.deferUpdate();

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-linkspanel')
                            .setPlaceholder('Aucune sélection')
                            .addOptions([
                                {
                                    label: `Assistance`,
                                    description: `Rejoindre le serveur d'assistance`,
                                    emoji: "1209141518279905300",
                                    value: "support-linkspanel",
                                },
                                {
                                    label: `Inviter Kaori`,
                                    description: `Inviter le Bot sur votre serveur`,
                                    emoji: "1209143065655115786",
                                    value: "invite-linkspanel",
                                },
                                {
                                    label: `Serveur communautaire`,
                                    description: `Rejoindre le serveur communautaire !`,
                                    emoji: "1209141523887955999",
                                    value: "community-linkspanel",
                                },
                                {
                                    label: `Top.gg`,
                                    description: `Afficher le lien top.gg`,
                                    emoji: "1209141515952062464",
                                    value: "top.gg-linkspanel",
                                },
                            ]),
                    );

                let row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Invitation du Bot")
                            .setURL(client.config.discord.botInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                client.embed({
                    title: `Invitation du Bot`,
                    desc: `Améliorez votre serveur avec le Bot !`,
                    url: client.config.discord.serverInvite,
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    })
}
