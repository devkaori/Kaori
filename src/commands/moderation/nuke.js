const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction);

    if (perms == false) return;

    interaction.channel.clone().then((channel) => {
        channel.setPosition(interaction.channel.position).then(
            interaction.channel.delete()
        );

        client.embed({
            title: `Canal détruit par **${interaction.user.tag}**`,
        }, channel)
    })
}

 
