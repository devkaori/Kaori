const Discord = require('discord.js');
const generator = require('generate-password');

module.exports = (client, err, command, interaction) => {
    console.log(err);
    const password = generator.generate({
        length: 10,
        numbers: true
    });

    const errorlog = new Discord.WebhookClient({
        id: client.webhooks.errorLogs.id,
        token: client.webhooks.errorLogs.token,
    });

    let embed = new Discord.EmbedBuilder()
        .setTitle(`${password}`)
        .addFields(
            { name: "Serveur", value: `${interaction.guild.name} (${interaction.guild.id})`},
            { name: `Commande`, value: `${command}`},
            { name: `Erreur`, value: `\`\`\`${err}\`\`\``},
            { name: `Trace d'erreur`, value: `\`\`\`${err.stack.substr(0, 1018)}\`\`\``},
        )
        .setColor(client.config.colors.normal)
    errorlog.send({
        username: `Erreurs du Bot`,
        embeds: [embed],

    }).catch(error => { console.log(error) })

    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("Serveur de support")
                .setURL(client.config.discord.serverInvite)
                .setStyle(Discord.ButtonStyle.Link),
        );

    client.embed({
        title: `Erreur`,
        desc: `Une erreur s'est produite lors de l'exécution de cette commande`,
        color: client.config.colors.error,
        fields: [
            {
                name: `Code d'erreur`,
                value: `\`${password}\``,
                inline: true,
            },
            {
                name: `Que faire maintenant ?`,
                value: `Vous pouvez contacter les développeurs en rejoignant le serveur de support`,
                inline: true,
            }
        ],
        components: [row],
        type: 'editreply'
    }, interaction).catch(() => {
        client.embed({
            title: `Erreur`,
            desc: `Une erreur s'est produite lors de l'exécution de cette commande`,
            color: client.config.colors.error,
            fields: [
                {
                    name: `Code d'erreur`,
                    value: `\`${password}\``,
                    inline: true,
                },
                {
                    name: `Que faire maintenant ?`,
                    value: `Vous pouvez contacter les développeurs en rejoignant le serveur de support`,
                    inline: true,
                }
            ],
            components: [row],
            type: 'editreply'
        }, interaction)
    })
};