const discord = require('discord.js');

module.exports = async (client, invite) => {
    const logsChannel = await client.getLogs(invite.guild.id);
    if (!logsChannel) return;

    await client.embed({
        title: `Invitation supprimée`,
        desc: `Une invitation a été supprimée`,
        fields: [
            {
                name: `Code`,
                value: `${invite.code}`
            },
            {
                name: `Horodatage`,
                value: `<t:${Math.floor(invite.createdTimestamp / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { });
};
