const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");
const Case = require("../../database/models/warnCase");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) {
        client.errNormal({
            error: "Vous n'avez pas les permissions requises pour utiliser cette commande !",
            type: 'editreply'
        }, interaction);
        return;
    }

    var member = interaction.options.getUser('utilisateur');
    var reason = interaction.options.getString('raison');
    var caseNumber;

    await Case.findOne({ Guild: interaction.guild.id }).then(async data => {
        if (!data) {
            new Case({
                Guild: interaction.guild.id,
                Case: 1
            }).save();
            caseNumber = 1;
        }
        else {
            data.Case += 1;
            data.save();
            caseNumber = data.Case;
        }
    });

    Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
        if (data) {
            data.Warnings.push({
                Moderator: interaction.user.id,
                Reason: raison,
                Date: Date.now(),
                Case: caseNumber
            });
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                User: member.id,
                Warnings: [{
                    Moderator: interaction.user.id,
                    Reason: raison,
                    Date: Date.now(),
                    Case: caseNumber
                }]
            }).save();
        }
    });

    client.embed({
        title: `Warn`,
        desc: `Vous avez reçu un avertissement dans **${interaction.guild.name}**`,
        fields: [
            {
                name: "Modérateur",
                value: interaction.user.tag,
                inline: true
            },
            {
                name: "Raison",
                value: raison,
                inline: true
            }
        ]
    }, member).catch(() => { });

    client.emit('warnAdd', member, interaction.user, reason);
    client.succNormal({
        text: `L'utilisateur a reçu un avertissement !`,
        fields: [
            {
                name: "Utilisateur",
                value: `${member}`,
                inline: true
            },
            {
                name: "Modérateur",
                value: `${interaction.user}`,
                inline: true
            },
            {
                name: "Raison",
                value: raison,
                inline: false
            }
        ],
        type: 'editreply'
    }, interaction);
}
