const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkBotPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction)

    if (perms == false) return;

    let name = interaction.options.getString('name').toLowerCase();

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

        channel.edit({ name: name });

        client.succNormal({
            text: `Le salon a été renommé en \`${name}\``,
            fields: [
                {
                    name: `Salon`,
                    value: `${channel} (${channel.name})`
                }
            ],
            type: 'editreply'
        }, interaction);
    }
}