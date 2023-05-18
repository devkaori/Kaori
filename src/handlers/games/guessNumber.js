const Discord = require('discord.js');

const Schema = require("../../database/models/guessNumber");

module.exports = async (client) => {
  client.on(Discord.Events.MessageCreate, async (message) => {
    if (message.author.bot || message.channel.type === Discord.ChannelType.DM) return;

    const data = await Schema.findOne({ Guild: message.guild.id, Channel: message.channel.id })
    if (data) {
      let number = parseInt(data.Number);
      let userNumber = parseInt(message.content);
      if (!userNumber) return;

      if (userNumber == number) {
        message.react(client.emotes.normal.check);
        let number = Math.ceil(Math.random() * 10000);

        let amount = Math.floor(Math.random() * 100) + 1;
        client.addMoney(message, message.author, amount);

        client.embed({
          title: `Devinez le nombre`,
          desc: `Le nombre a été deviné et a une valeur de $${amount}`,
          fields: [
            {
              name: `Devinez par`,
              value: `${message.author} (${message.author.tag})`,
              inline: true
            },
            {
              name: `Nombre correct`,
              value: `${data.Number}`,
              inline: true
            }
          ]
        }, message.channel);

        data.Number = number;
        data.save();

        client.embed({
          title: `Devinez le nombre`,
          desc: `Devinez le nombre entre **1** et **10.000** !`
        }, message.channel)
      }
      else if (userNumber > number) {
        return message.react(client.emotes.normal.arrowDown);
      }
      else if (userNumber < number) {
        return message.react(client.emotes.normal.arrowUp);
      }
    }
  }).setMaxListeners(0);
}