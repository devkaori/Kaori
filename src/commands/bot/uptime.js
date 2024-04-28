const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const duration = moment.duration(client.uptime).format("\`D\` [jours], \`H\` [heures], \`m\` [minutes], \`s\` [secondes]");
    const upvalue = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);

    client.embed({
        title: `Temps d'activité`,
        desc: `Consultez le temps d'activité de Bot`,
        image: `https://i.imgur.com/IFqedKi.png`,
        fields: [
            {
                name: "Temps d'activité",
                value: `${duration}`,
                inline: true
            },
            {
                name: "Démarré depuis",
                value: `<t:${upvalue}>`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction)
}