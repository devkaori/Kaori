const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({ error: `Le salon vocal n'existe pas !`, type: 'editreply' }, interaction);

    client.radioStop(channel);

    const removed = await Schema.deleteOne({ Guild: interaction.guild.id });

    client.embed({
        title: `Radio arrêtée`,
        desc: `La radio a été arrêtée avec succès. Pour faire rejoindre le bot, utilisez : \`radioplay\``,
        fields: [
            {
                name: "Arrêté par",
                value: `${interaction.user} (${interaction.user.tag})`,
                inline: true
            },
            {
                name: "Salon",
                value: `${channel} (${channel.name})`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction);

    let embed = new Discord.EmbedBuilder()
        .setTitle(`Radio arrêtée`)
        .setDescription(`La radio a été arrêtée avec succès`)
        .addFields(
            { name: "Arrêté par", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
            { name: "Salon", value: `${channel} (${channel.name})`, inline: true },
            { name: "Serveur", value: `${interaction.guild.name} (${interaction.guild.id})`, inline: true }
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Kaori Logs',
        embeds: [embed]
    });
};