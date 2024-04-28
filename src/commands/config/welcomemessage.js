const Discord = require('discord.js');

const inviteMessages = require("../../database/models/inviteMessages");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const message = interaction.options.getString('message');

    if (message.toUpperCase() == "HELP") {
        return client.embed({
            title: `Options de message de bienvenue`,
            desc: `Options de message de bienvenue : \n
            \`{user:username}\` - Nom d'utilisateur de l'utilisateur
            \`{user:discriminator}\` - Discriminateur de l'utilisateur
            \`{user:tag}\` - Balise de l'utilisateur
            \`{user:mention}\` - Mentionner un utilisateur

            \`{inviter:username}\` - Nom d'utilisateur de l'inviteur
            \`{inviter:discriminator}\` - Discriminateur de l'inviteur
            \`{inviter:tag}\` - Balise de l'inviteur
            \`{inviter:mention}\` - Mentionner l'inviteur
            \`{inviter:invites}\` - Invitations de l'inviteur
            \`{inviter:invites:left}\` - Invitations restantes de l'inviteur
                    
            \`{guild:name}\` - Nom du serveur
            \`{guild:members}\` - Nombre de membres du serveur`,
            image: `https://i.imgur.com/IFqedKi.png`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        inviteMessages.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.inviteJoin = null;
                data.save();

                client.succNormal({
                    text: `Message de bienvenue supprimé !`,
                    type: 'editreply'
                }, interaction);
            }
        })
    }
    else {
        inviteMessages.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.inviteJoin = message;
                data.save();
            }
            else {
                new inviteMessages({
                    Guild: interaction.guild.id,
                    inviteJoin: message
                }).save();
            }

            client.succNormal({
                text: `Le message de bienvenue a été configuré avec succès`,
                fields: [
                    {
                        name: `Message`,
                        value: `${message}`,
                        inline: true
                    },
                ],
                type: 'editreply'
            }, interaction)
        })
    }
}
