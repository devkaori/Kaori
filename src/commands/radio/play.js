const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) {
        return client.errNormal({ text: "Le salon vocal n'existe pas !", type: 'editreply' }, interaction);
    }

    client.radioStart(channel);

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            data.Channel = channel.id;
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
            }).save();
        }
    });

    client.embed({
        title: "Radio démarrée",
        desc: "La radio a démarré avec succès \nPour faire partir le bot, utilisez : `rleave`",
        fields: [
            {
                name: "Démarrée par",
                value: `${interaction.user} (${interaction.user.tag})`,
                inline: true
            },
            {
                name: "Salon",
                value: `${channel} (${channel.name})`,
                inline: true
            },
            {
                name: "Station de radio",
                value: "[Radio 538](https://www.538.nl/)",
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction);

    let embed = new Discord.EmbedBuilder()
        .setTitle("Radio démarrée")
        .setDescription("La radio a démarré avec succès")
        .addFields(
            { name: "Démarrée par", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
            { name: "Salon", value: `${channel} (${channel.name})`, inline: true },
            { name: "Serveur", value: `${interaction.guild.name} (${interaction.guild.id})`, inline: true }
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Kaori Logs',
        embeds: [embed],
    });
};