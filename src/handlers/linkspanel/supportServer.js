const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-linkspanel") {
            if (interaction.values == "support-linkspanel") {
                interaction.deferUpdate();

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-linkspanel')
                            .setPlaceholder('Rien de sélectionné')
                            .addOptions([
                                {
                                    label: `Serveur de support`,
                                    description: `Rejoignez le serveur de support`,
                                    emoji: "1209141518279905300",
                                    value: "support-linkspanel",
                                },
                                {
                                    label: `Inviter Kaori`,
                                    description: `Invitez le Bot sur votre serveur`,
                                    emoji: "1209143065655115786",
                                    value: "invite-linkspanel",
                                },
                                {
                                    label: `Serveur communautaire`,
                                    description: `Rejoignez le serveur communautaire !`,
                                    emoji: "1209141523887955999",
                                    value: "community-linkspanel",
                                },
                                {
                                    label: `Top.gg`,
                                    description: `Affichez le lien top.gg`,
                                    emoji: "1209141515952062464",
                                    value: "top.gg-linkspanel",
                                },
                            ]),
                    );

                let row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Serveur de support")
                            .setURL(client.config.discord.serverInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                client.embed({
                    title: `Serveur de support`,
                    desc: `Améliorez votre serveur avec le Bot !`,
                    url: client.config.discord.serverInvite,
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    })
}
