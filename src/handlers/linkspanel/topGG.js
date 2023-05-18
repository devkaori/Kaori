const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-linkspanel") {
            if (interaction.values == "top.gg-linkspanel") {
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
                                    emoji: "❓",
                                    value: "support-linkspanel",
                                },
                                {
                                    label: `Inviter le Bot`,
                                    description: `Invitez le Bot sur votre serveur`,
                                    emoji: "📨",
                                    value: "invite-linkspanel",
                                },
                                {
                                    label: `Serveur communautaire`,
                                    description: `Rejoignez le serveur communautaire !`,
                                    emoji: "🌍",
                                    value: "community-linkspanel",
                                },
                                {
                                    label: `Top.gg`,
                                    description: `Affichez le lien top.gg`,
                                    emoji: "📃",
                                    value: "top.gg-linkspanel",
                                },
                            ]),
                    );

                let row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Voter maintenant")
                            .setURL("https://top.gg/bot/798144456528363550/vote")
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                client.embed({
                    title: `Vote pour Kaori`,
                    desc: `Votez pour Kaori sur top.gg`,
                    url: "https://top.gg/bot/855107430693077033/vote",
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    })
}