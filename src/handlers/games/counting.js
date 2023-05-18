const Discord = require("discord.js");

const countSchema = require("../../database/models/countChannel");
const count = require("../../database/models/count");

module.exports = async (client) => {
  client
    .on("messageCreate", async (message) => {
      if (message.author.bot || message.channel.type === Discord.ChannelType.DM) return;

      if (
        isNaN(message.content) ||
        message.attachments.size > 0 ||
        message.type == Discord.MessageType.ChannelPinnedMessage
      )
        return;

      const data = await countSchema.findOne({
        Guild: message.guild.id,
        Channel: message.channel.id,
      });
      const countData = await count.findOne({ Guild: message.guild.id });

      if (data && countData) {
        if (message.author.id == countData.User) {
          try {
            client.errNormal(
              {
                error:
                  "Vous ne pouvez pas compter deux fois de suite ! Le compte recommence à partir de 1.",
                type: "reply",
              },
              message
            );

            countData.Count = 1;
            countData.User = " ";
            countData.save();
            return message.react(client.emotes.normal.error);
          } catch (error) {
            message.react(client.emotes.normal.error);
            console.log(error);
          }
        } else {
          if (message.content == countData.Count) {
            message.react(client.emotes.normal.check);
            countData.User = message.author.id;
            countData.Count += 1;
            countData.save();
          } else {
            try {
              client.errNormal(
                {
                  error: `Le nombre correct était ${countData.Count} ! Le compte recommence à partir de 1.`,
                  type: "reply",
                },
                message
              );

              countData.Count = 1;
              countData.User = " ";
              countData.save();
              return message.react(client.emotes.normal.error);
            } catch (error) {
              message.react(client.emotes.normal.error);
              console.log(error)
            }
          }
        }
      } else if (data) {
        if (message.content == 1) {
          message.react(client.emotes.normal.check);

          new count({
            Guild: message.guild.id,
            User: message.author.id,
            Count: 2,
          }).save();
        } else {
          return message.react(client.emotes.normal.error);
        }
      }
    })
    .setMaxListeners(0);

  client
    .on("messageDelete", async (message) => {
      try {
        if (isNaN(message.content) || message.author.bot) return;

        const data = await countSchema.findOne({
          Guild: message.guild.id,
          Channel: message.channel.id,
        });
        const countData = await count.findOne({ Guild: message.guild.id });

        if (data && countData) {
          let lastCount = countData.Count - 1;
          if (message.content == lastCount) {
            client.simpleEmbed(
              {
                desc: `**${message.author.tag}**: ${message.content}`,
              },
              message.channel
            );
          }
        }
      } catch {}
    })
    .setMaxListeners(0);
};