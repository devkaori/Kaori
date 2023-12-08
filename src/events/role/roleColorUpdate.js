const Discord = require('discord.js');

module.exports = async (client, role, oldColor, newColor) => {
    const logsChannel = await client.getLogs(role.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Mise à jour de la couleur du rôle`,
        desc: `Un rôle a été mis à jour`,
        fields: [
            {
                name: `Rôle`,
                value: `${role}`
            },
            {
                name: `Avant`,
                value: `#${oldColor.toString(16)}`
            },
            {
                name: `Après`,
                value: `#${newColor.toString(16)}`
            },
            {
                name: `ID`,
                value: `${role.id}`
            },
            {
                name: `Timestamp`,
                value: `<t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => {});
};
