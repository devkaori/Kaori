const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    const user = interaction.options.getUser('user') || interaction.user;

    if (user.bot) return client.errNormal({
        error: "Vous ne pouvez pas voir le solde d'un bot !",
        type: 'editreply'
    }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {

            let total = data.Money + data.Bank;

            client.embed({
                title: "Solde",
                fields: [
                    {
                        name: "Portefeuille",
                        value: `$${data.Money}`,
                        inline: true
                    },
                    {
                        name: "Banque",
                        value: `$${data.Bank}`,
                        inline: true
                    },
                    {
                        name: "Total",
                        value: `$${total}`,
                        inline: true
                    }
                ],
                desc: `Le solde actuel de \`${user.tag}\``,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: "L'utilisateur n'a pas d'argent !",
                type: 'editreply'
            }, interaction);
        }
    })
}
