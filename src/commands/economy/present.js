const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;
    let timeout = 604800000;


    Schema2.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, dataTime) => {
        if (dataTime && dataTime.Present !== null && timeout - (Date.now() - dataTime.Present) > 0) {
            let time = (dataTime.Present / 1000 + timeout / 1000).toFixed(0);
            return client.errWait({
                time: time,
                type: 'editreply'
            }, interaction);
        }
        else {
            let amount = Math.floor(Math.random() * 1000) + 1;

            client.succNormal({
                text: `Vous avez collecté votre récompense de cadeau !`,
                fields: [
                    {
                        name: `Montant`,
                        value: `$${amount}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);

            if (dataTime) {
                dataTime.Present = Date.now();
                dataTime.save();
            }
            else {
                new Schema2({
                    Guild: interaction.guild.id,
                    User: user.id,
                    Present: Date.now()
                }).save();
            }

            client.addMoney(interaction, user, amount);
        }
    })
}
