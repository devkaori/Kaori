const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    const user = await interaction.guild.members.fetch(interaction.options.getUser('user'));
    let amount = interaction.options.getNumber('amount');
    
    if (amount < 0) return client.errNormal({ error: `Vous ne pouvez pas payer une somme d'argent négative !`, type: 'editreply' }, interaction);

    if (user.id == interaction.user.id) {
        return client.errNormal({
            error: "Vous ne pouvez pas vous payer vous-même !",
            type: 'editreply'
        }, interaction)
    }

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (data) {
            if (data.Money < parseInt(amount)) return client.errNormal({ error: `Vous n'avez pas autant d'argent !`, type: 'editreply' }, interaction);

            let money = parseInt(amount);

            data.Money -= money;
            data.save();

            client.addMoney(interaction, user, money);

            client.succNormal({
                text: `Vous avez payé de l'argent à un utilisateur !`,
                fields: [
                    {
                        name: `Utilisateur`,
                        value: `${user}`,
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
            client.errNormal({ text: `Vous n'avez pas d'argent !`, type: 'editreply' }, interaction);
        }
    })
}
