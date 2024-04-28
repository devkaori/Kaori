const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const row = new Discord.ActionRowBuilder()
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
                        label: `Inviter le bot`,
                        description: `Invitez le bot sur votre serveur`,
                        emoji: "📨",
                        value: "invite-linkspanel",
                    },
                    {
                        label: `Serveur de la communauté`,
                        description: `Rejoignez le serveur de la communauté !`,
                        emoji: "🌍",
                        value: "community-linkspanel",
                    },
                    {
                        label: `Top.gg`,
                        description: `Afficher le lien top.gg`,
                        emoji: "📃",
                        value: "top.gg-linkspanel",
                    },
                ]),
        );

    client.embed({
        title: `Liens`,
        image: `https://i.imgur.com/IFqedKi.png`,
        desc: `Accédez à tous les liens du bot ! Choisissez le lien dont vous avez besoin dans le menu ci-dessous`,
        components: [row],
        type: 'editreply'
    }, interaction)
}