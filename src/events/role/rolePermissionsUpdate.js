const Discord = require('discord.js');

module.exports = async (client, role, oldPerms, newPerms) => {
    const logsChannel = await client.getLogs(role.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Mise à jour des permissions du rôle`,
        desc: `Un rôle a été mis à jour`,
        fields: [
            {
                name: `> Rôle`,
                value: `- ${role}`
            },
            {
                name: `> Avant`,
                value: `- ${new Discord.Permissions(oldPerms).toArray().join(', ') || 'Aucune'}`
            },
            {
                name: `> Après`,
                value: `- ${new Discord.Permissions(newPerms).toArray().join(', ') || 'Aucune'}`
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