const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.BanMembers],
    perms: [Discord.PermissionsBitField.Flags.BanMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Non spécifiée';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return client.errNormal({
    error: "Vous ne pouvez pas bannir un modérateur",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `Ban`,
    desc: `Vous avez été banni dans **${interaction.guild.name}**`,
    fields: [
      {
        name: "Banni par",
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
    member.ban({ days: 7, reason: reason })
    client.succNormal({
      text: "L'utilisateur spécifié a été banni avec succès et a reçu une notification avec succès!",
      fields: [
        {
          name: "Utilisateur banni",
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
    member.ban({ days: 7, reason: reason })
    client.succNormal({
      text: "L'utilisateur donné a été banni avec succès, mais n'a pas reçu de notification!",
      type: 'editreply'
    }, interaction);
  });

  setTimeout(() => {
    interaction.guild.members.unban(member.id)
  }, 2000)
}
