const discord = require('discord.js');

module.exports = async (client, user, mod) => {
    const logsChannel = await client.getLogs(user.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Avertissement membre annulé`,
        desc: `Un avertissement a été annulé pour un utilisateur`,
        fields: [
            {
                name: `Utilisateur`,
                value: `${user}`
            },
            {
                name: `Tag`,
                value: `${user.user.username}#${user.user.discriminator}`
            },
            {
                name: `ID`,
                value: `${user.id}`
            },
            {
                name: `Modérateur`,
                value: `${mod} (${mod.id})`
            }
        ]
    }, logsChannel).catch(() => { });
};
