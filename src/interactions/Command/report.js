const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Signaler un bug ou un utilisateur aux développeurs')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Le type de votre signalement')
                .setRequired(true)
                .addChoices(
                    { name: 'Bug', value: 'bug' },
                    { name: 'Utilisateur', value: 'user' }
                )
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Description de votre signalement')
                .setRequired(true)
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const webhookClient = new Discord.WebhookClient({
            id: client.webhooks.bugReportLogs.id,
            token: client.webhooks.bugReportLogs.token
        });

        const type = interaction.options.getString('type');
        const desc = interaction.options.getString('description');

        if (type == "bug") {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`Nouveau rapport de bug !`)
                .addFields(
                    { name: "Catégorie du rapport", value: "Bug", inline: true },
                    { name: "Soumis par", value: `${interaction.user.tag}`, inline: true },
                )
                .setDescription(`${desc}`)
                .setColor(client.config.colors.normal)
            webhookClient.send({
                username: 'Rapports du bot',
                embeds: [embed],
            });

            client.succNormal({
                text: `Bug envoyé avec succès aux développeurs !`,
                type: 'ephemeraledit'
            }, interaction);
        }
        else if (type == "user") {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`Nouveau rapport utilisateur !`)
                .addFields(
                    { name: "Catégorie du rapport", value: "Utilisateur", inline: true },
                    { name: "Soumis par", value: `${interaction.user.tag}`, inline: true },
                )
                .setDescription(`${desc}`)
                .setColor(client.config.colors.normal)
            webhookClient.send({
                username: 'Rapports du bot',
                embeds: [embed],
            });

            client.succNormal({
                text: `Rapport utilisateur envoyé avec succès aux développeurs !`,
                type: 'ephemeraledit'
            }, interaction);
        }
    },
};