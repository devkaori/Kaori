const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
  let user = interaction.user;
  let timeout = 600000;

  Schema2.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, dataTime) => {
    if (dataTime && dataTime.Work !== null && timeout - (Date.now() - dataTime.Work) > 0) {
      let time = (dataTime.Work / 1000 + timeout / 1000).toFixed(0);
      return client.errWait({
        time: time,
        type: 'editreply'
      }, interaction);
    }
    else {
      let replies = ['Programmeur', 'Hacker', 'Serveur', 'Commis de salle', 'Chef', 'Mécanicien']

      let result = Math.floor((Math.random() * replies.length));
      let amount = Math.floor(Math.random() * 100) + 1;

      client.succNormal({ text: `Vous avez travaillé en tant que ${replies[result]} et gagné : **${client.emotes.economy.coins} $${amount}**`, type: 'editreply' }, interaction);

      client.succNormal({
        text: `Vous avez travaillé et gagné de l'argent !`,
        fields: [
          {
            name: `Métier`,
            value: `${replies[result]}`,
            inline: true
          },
          {
            name: `Gains`,
            value: `$${amount}`,
            inline: true
          }
        ],
        type: 'editreply'
      }, interaction);

      if (dataTime) {
        dataTime.Work = Date.now();
        dataTime.save();
      }
      else {
        new Schema2({
          Guild: interaction.guild.id,
          User: user.id,
          Work: Date.now()
        }).save();
      }

      client.addMoney(interaction, user, amount);
    }
  })
}
