const Discord = require('discord.js');
const BlackList = require("../../database/models/blacklist");

module.exports = async (client) => {
  client.on(Discord.Events.MessageCreate, async (message) => {
    if (message.channel.type === Discord.ChannelType.DM) return;

    try {
      BlackList.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
          const lowerMsg = message.content.toLowerCase();
          const splittedMsg = lowerMsg.split(' ');

          let deleting = false;

          await Promise.all(
            splittedMsg.map((content) => {
              try {
                if (data.Words.includes(content.toLowerCase())) deleting = true;
              }
              catch { }
            })
          )

          // Vérifie si l'auteur du message n'a pas la permission "Gérer les messages"
          if (deleting && !message.member.permissions.has('ManageMessages')) {
            return message.delete({ timeout: 1000 });
          }
        }
      })
    } catch { }
  }).setMaxListeners(0);

  client.on(Discord.Events.MessageUpdate, async (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content || newMessage.channel.type === Discord.ChannelType.DM) return;
    try {
      BlackList.findOne({ Guild: oldMessage.guild.id }, async (err, data) => {
        if (data) {
          const lowerMsg = newMessage.content.toLowerCase();
          const splittedMsg = lowerMsg.split(' ');

          let deleting = false;

          await Promise.all(
            splittedMsg.map((content) => {
              try {
                if (data.Words.includes(content.toLowerCase())) deleting = true;
              }
              catch { }
            })
          )

          // Vérifie si l'auteur du message n'a pas la permission "Gérer les messages"
          if (deleting && !newMessage.member.permissions.has('ManageMessages')) {
            return newMessage.delete();
          }
        }
      })
    } catch { }
  }).setMaxListeners(0);
}
