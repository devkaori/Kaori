const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
  let user = interaction.user;
  let timeout = 31557600000;
  let amount = 50000;

  Schema2.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, dataTime) => {
    if (dataTime && dataTime.Yearly !== null && timeout - (Date.now() - dataTime.Yearly) > 0) {
      let time = (dataTime.Yearly / 1000 + timeout / 1000).toFixed(0);
      return client.errWait({
        time: time,
        type: 'editreply'
      }, interaction);
    }
    else {
      client.succNormal({
        text: `Vous avez collecté votre récompense annuelle de **${client.emotes.economy.coins} $${amount}**`,
        type: 'editreply'
      }, interaction);

      client.succNormal({
        text: `Vous avez collecté votre récompense annuelle !`,
        fields: [
          {
            name: `Gains`,
            value: `$${amount}`,
            inline: true
          }
        ],
        type: 'editreply'
      }, interaction);

      if (dataTime) {
        dataTime.Yearly = Date.now();
        dataTime.save();
      }
      else {
        new Schema2({
          Guild: interaction.guild.id,
          User: user.id,
          Yearly: Date.now()
        }).save();
      }

      client.addMoney(interaction, user, amount);
    }
  })
}
