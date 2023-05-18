const Discord = require('discord.js');

module.exports = async (client, oldMessage, newMessage) => {
  try {
    if (!oldMessage.content || !newMessage.content) return;
    if (oldMessage.content === newMessage.content) return;
    if (oldMessage.author.bot) return;

    const logsChannel = await client.getLogs(oldMessage.guild.id);
    if (!logsChannel) return;

    let row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setEmoji("🔗")
          .setLabel("Aller au Message")
          .setURL(`https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id}`)
          .setStyle("LINK")
      );

    client.embed(
      {
        title: `Message mis à jour`,
        desc: `Un message a été mis à jour`,
        fields: [
          {
            name: `> Auteur`,
            value: `- ${newMessage.member.user} (${newMessage.member.user.tag})`
          },
          {
            name: `> Date`,
            value: `- ${newMessage.createdAt}`
          },
          {
            name: `> Canal`,
            value: `- ${newMessage.channel} (${newMessage.channel.name})`
          },
          {
            name: `> Ancien message`,
            value: `\`\`\`${oldMessage.content.replace(/`/g, "'")}\`\`\``
          },
          {
            name: `> Nouveau message`,
            value: `\`\`\`${newMessage.content.replace(/`/g, "'")}\`\`\``
          },
          {
            name: `> Horodecimal`,
            value: `- <t:${Math.floor(newMessage.createdTimestamp / 1000)}:R>`
          }
        ],
        components: [row]
      },
      logsChannel
    ).catch(() => {});
  } catch {}
};