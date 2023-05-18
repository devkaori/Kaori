const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.Administrator],
        perms: [Discord.PermissionsBitField.Flags.Administrator]
    }, interaction)

    if (perms == false) return;

    const user = interaction.options.getUser('user');
    let amount = interaction.options.getNumber('amount');

    if (!user || !amount) return client.errUsage({ usage: "addmoney [user] [montant]", type: 'editreply' }, interaction);

    if (isNaN(amount)) return client.errNormal({ error: "Entrez un nombre valide !", type: 'editreply' }, interaction);

    if (user.bot) return client.errNormal({
        error: "Vous ne pouvez pas ajouter d'argent à un bot !",
        type: 'editreply'
    }, interaction);

    client.addMoney(interaction, user, parseInt(amount));

    setTimeout(() => {
        Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
            if (data) {

                client.succNormal({
                    text: "Argent ajouté à un utilisateur !",
                    fields: [
                        {
                            name: "Utilisateur",
                            value: `<@!${user.id}>`,
                            inline: true
                        },
                        {
                            name: `Montant`,
                            value: `$${amount}`,
                            inline: true
                        }
                    ],
                    type: 'editreply'
                }, interaction);
            }
            else {
                client.errNormal({ error: "Cet utilisateur n'a pas d'argent !", type: 'editreply' }, interaction);
            }
        }, 500)
    })
}
