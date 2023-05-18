const Discord = require('discord.js');

module.exports = async (client, role, oldName, newName) => {
    const logsChannel = await client.getLogs(role.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Mise à jour du nom du rôle`,
        desc: `Un rôle a été mis à jour`,
        fields: [
            {
                name: `> Rôle`,
                value: `- ${role}`
            },
            {
                name: `> Avant`,
                value: `- ${oldName}`
            },
            {
                name: `> Après`,
                value: `- ${newName}`
            },
            {
                name: `> ID`,
                value: `${role.id}`
            },
            {
                name: `> Timestamp`,
                value: `- <t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => {});
};