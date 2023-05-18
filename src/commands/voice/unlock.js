const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkBotPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction)

    if (perms == false) return;

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `Vous n'êtes pas dans un salon vocal !`,
        type: 'editreply'
    }, interaction);
    var checkVoice = await client.checkVoice(interaction.guild, channel);
    if (!checkVoice) {
        return client.errNormal({
            error: `Vous ne pouvez pas modifier ce salon !`,
            type: 'editreply'
        }, interaction);
    } else {
        client.succNormal({
            text: `Le salon a été déverrouillé avec succès !`,
            fields: [
                {
                    name: `Salon`,
                    value: `${channel} (${channel.name})`
                }
            ],
            type: 'editreply'
        }, interaction);

        channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(x => x.name === '@everyone'), {
            CONNECT: true
        });
    }
}