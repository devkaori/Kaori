const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkBotPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction)

    if (perms == false) return;

    let limit = interaction.options.getNumber('limit');

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `Vous n'êtes pas dans un salon vocal !`,
        image: `https://i.imgur.com/IFqedKi.png`,
        type: 'editreply'
    }, interaction);
    var checkVoice = await client.checkVoice(interaction.guild, channel);
    if (!checkVoice) {
        return client.errNormal({
            error: `Vous ne pouvez pas modifier ce salon !`,
            image: `https://i.imgur.com/IFqedKi.png`,
            type: 'editreply'
        }, interaction);
    } else {
        channel.setUserLimit(limit);

        client.succNormal({
            text: `La limite du salon a été définie sur \`${limit}\` !`,
            image: `https://i.imgur.com/IFqedKi.png`,
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
