const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-linkspanel") {
            if (interaction.values == "community-linkspanel") {
                interaction.deferUpdate();

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-linkspanel')
                            .setPlaceholder('Aucune sélection')
                            .addOptions([
                                {
                                    label: `Serveur de support`,
                                    description: `Rejoindre le serveur de support`,
                                    emoji: "1209141518279905300",
                                    value: "support-linkspanel",
                                },
                                {
                                    label: `Inviter le Bot`,
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
                            .setLabel("Serveur communautaire")
                            .setURL("https://discord.gg/HyybNmz2Ww")
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                client.embed({
                    title: `Serveur communautaire`,
                    desc: `Discutez et jouez à des jeux sur le serveur communautaire !`,
                    url: client.config.discord.botInvite,
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    })
}
