const Discord = require('discord.js');

const Schema = require("../../database/models/levelMessages");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const message = interaction.options.getString('message');

    if (message.toUpperCase() == "HELP") {
        return client.embed({
            title: `Options du message de niveau`,
            desc: `Voici les options du message de niveau : \n
            \`{user:username}\` - Nom d'utilisateur de l'utilisateur
            \`{user:discriminator}\` - Discriminateur de l'utilisateur
            \`{user:tag}\` - Balise de l'utilisateur
            \`{user:mention}\` - Mentionner un utilisateur

            \`{user:level}\` - Niveau de l'utilisateur
            \`{user:xp}\` - XP de l'utilisateur`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                Schema.findOneAndDelete({ Guild: interaction.guild.id }).then(() => {
                    client.succNormal({ 
                        text: `Message de niveau supprimé !`,
                        type: 'editreply'
                    }, interaction);
                })
            }
        })
    }
    else {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Message = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    Message: message
                }).save();
            }

            client.succNormal({
                text: `Le message de niveau a été défini avec succès`,
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
