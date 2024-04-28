const Discord = require('discord.js');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction)

    if (perms == false) return;

    const name = interaction.options.getString('name');

    if (name.toUpperCase() == "HELP") {
        return client.embed({
            title: `Options de nom de salon`,
            desc: `Voici les options de nom de salon : \n
            \`{emoji}\` - Émoji du salon
            \`{name}\` - Nom du salon`,
            image: `https://i.imgur.com/IFqedKi.png`,
            type: 'editreply'
        }, interaction)
    }

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            data.ChannelTemplate = name
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                ChannelTemplate: name
            }).save();
        }

        client.succNormal({
            text: `Le nom du salon a été configuré avec succès`,
            image: `https://i.imgur.com/IFqedKi.png`,
            fields: [
                {
                    name: `Nom`,
                    value: `${name}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    })
}
