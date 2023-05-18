const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    let amount = interaction.options.getNumber('amount');
    let user = interaction.user;

    if (!amount) return client.errUsage({ usage: "withdraw [montant]", type: 'editreply' }, interaction);

    if (isNaN(amount)) return client.errNormal({ error: "Entrez un nombre valide !", type: 'editreply' }, interaction);

    if (amount < 0) return client.errNormal({ error: `Vous ne pouvez pas retirer un montant négatif !`, type: 'editreply' }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            if (data.Bank === 0) return client.errNormal({ error: `Vous n'avez plus rien dans votre compte en banque !`, type: 'editreply' }, interaction);

            let money = parseInt(amount);

            data.Money += money;
            data.Bank -= money;
            data.save();

            client.succNormal({
                text: `Vous avez retiré de l'argent de votre compte en banque !`,
                fields: [
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
            client.errNormal({ text: `Vous n'avez aucun argent à retirer !`, type: 'editreply' }, interaction);
        }
    })
}
