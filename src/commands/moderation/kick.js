const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.KickMembers],
    perms: [Discord.PermissionsBitField.Flags.KickMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Non spécifiée';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return client.errNormal({
    error: "Vous ne pouvez pas expulser un modérateur",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `Expulsion`,
    desc: `Vous avez été expulsé de **${interaction.guild.name}**`,
    fields: [
      {
        name: "Expulsé par",
        value: interaction.user.tag,
        inline: true
      },
      {
        name: "Raison",
        value: reason,
        inline: true
      }
    ]
  }, member).then(function () {
    member.kick(reason)
    client.succNormal({
      text: "L'utilisateur spécifié a été expulsé avec succès et a reçu une notification avec succès !",
      fields: [
        {
          name: "Utilisateur expulsé",
          value: member.user.tag,
          inline: true
        },
        {
          name: "Raison",
          value: reason,
          inline: true
        }
      ],
      type: 'editreply'
    }, interaction);
  }).catch(function () {
    member.kick(reason)
    client.succNormal({
      text: "L'utilisateur donné a été expulsé avec succès, mais n'a pas reçu de notification !",
      type: 'editreply'
    }, interaction);
  });
}
