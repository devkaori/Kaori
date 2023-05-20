const Discord = require('discord.js');

const Schema = require("../../database/models/messageRewards");

module.exports = async (client, interaction, args) => {
    let messages = interaction.options.getNumber('amount');

    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;
    
    Schema.findOne({ Guild: interaction.guild.id, Messages: messages }, async (err, data) => {
        if (data) {
            Schema.findOneAndDelete({ Guild: interaction.guild.id, Messages: messages }).then(() => {
                client.succNormal({
                    text: `Récompense de message supprimée`,
                    fields: [
                        {
                            name: "Messages",
                            value: `${messages}`,
                            inline: true,
                        }
                    ],
                    type: 'editreply'
                }, interaction);
            })
        }
        else {
            return client.errNormal({
                error: "Aucune récompense de message trouvée avec cette quantité de messages !",
                type: 'editreply'
            }, interaction);
        }
    })
}
