const Discord = require('discord.js');

const Schema = require("../../database/models/functions");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const boolean = interaction.options.getBoolean('boolean');

    const data = await Schema.findOne({ Guild: interaction.guild.id });
    if (data) {
        data.Levels = boolean;
        data.save();
    }
    else {
        new Schema({
            Guild: interaction.guild.id,
            Levels: boolean,
        }).save();
    }

    client.succNormal({
        text: `Les niveaux sont maintenant **${boolean ? 'activés' : 'désactivés'}** dans ce serveur`,
        image: `https://i.imgur.com/IFqedKi.png`,
        type: 'editreply'
    }, interaction);
}
