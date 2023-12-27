const Discord = require('discord.js');
const axios = require("axios");

const model = require('../../database/models/badge');

module.exports = async (client, interaction, args) => {
  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  if (!member) return client.errNormal({
    error: "Cet utilisateur n'est pas dans ce serveur !",
    type: 'editreply'
  }, interaction);
  const badgeFlags = {
    DEVELOPER: client.emotes.badges.developer,
    BUGS: client.emotes.badges.bug,
    MANAGEMENT: client.emotes.badges.management,
    PREMIUM: client.emotes.badges.premium,
    SUPPORTER: client.emotes.badges.supporter,
    TEAM: client.emotes.badges.team,
    BOOSTER: client.emotes.badges.booster,
    PARTNER: client.emotes.badges.partner,
    VOTER: client.emotes.badges.voter,
    SUPPORT: client.emotes.badges.support,
    MODERATOR: client.emotes.badges.moderator,
    DESIGNER: client.emotes.badges.designer,
    MARKETING: client.emotes.badges.marketing
  }

  const flags = {
    ActiveDeveloper: "<:badge_active_developer:1189618082608590911>",
    BugHunterLevel1: "<:bug_hunter_standard:1189618218759884880>",
    BugHunterLevel2: "<:bug_hunter:1189618242055045140>",
    CertifiedModerator: "<:certified_moderator:1189619286994596021>",
    HypeSquadOnlineHouse1: "<:hypesquad_bravery_badge:1189618466777469099>",
    HypeSquadOnlineHouse2: "<:hypesquad_brilliance_badge:1189618442450514020>",
    HypeSquadOnlineHouse3: "<:hypesquad_balance_badge:1189618461282930821>",
    HypeSquadEvents: "<:Discord_HypeSquad_Event:1189619307907403826>",
    PremiumEarlySupporter: "<:GMD_Early_Discord_Supporter:1189619303704694795>",
    Partner: "<:blurple_partner:1189619314366619748>",
    Quarantined: "<:quarantinered:1189619291415379968>", // Pas sûr que cela soit toujours d'actualité
    Spammer: "<:spam:1189619281353248839>", // Pas sûr que cela fonctionne
    Staff: "<:Discord_Staff:1189619298440859738>",
    TeamPseudoUser: "<:Discord_Staff:1189619298440859738>",
    VerifiedBot: "<:Verified_Bot:1189619275527356486>",
    VerifiedDeveloper: "<:blurple_verified_bot_developer:1189619295848767518>",
  }

  let Badges = await model.findOne({ User: member.user.id });
  if (!Badges) Badges = { User: member.user.id }
  const roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, -1);
  const userFlags = member.user.flags ? member.user.flags.toArray() : [];

  return client.embed({
    title: `Informations utilisateur`,
    desc: `Informations sur ${member.user.username}`,
    thumbnail: member.user.displayAvatarURL({ dynamic: true, size: 1024 }),
    image: member.user.bannerURL({ dynamic: true, size: 1024 }),
    fields: [
      {
        name: "Nom d'utilisateur",
        value: `${member.user.username}`,
        inline: true,
      },
      {
        name: "Discriminant",
        value: `${member.user.discriminator}`,
        inline: true,
      },
      {
        name: "Surnom",
        value: `${member.nickname || 'Aucun surnom'}`,
        inline: true,
      },
      {
        name: "ID",
        value: `${member.user.id}`,
        inline: true,
      },
      {
        name: "Badges Discord",
        value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'Aucun'}`,
        inline: true,
      },
      {
        name: "Badges Kaori",
        value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'Aucun'}`,
        inline: true,
      },
      {
        name: "Date d'inscription sur Discord",
        value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`,
        inline: true,
      },
      {
        name: "Date d'arrivée sur le serveur",
        value: `<t:${Math.round(member.joinedAt / 1000)}>`,
        inline: true,
      },
      {
        name: `Rôles [${roles.length}]`,
        value: `${roles.length ? roles.join(', ') : 'Aucun'}`,
        inline: false,
      }
    ],
    type: 'editreply'
  }, interaction)
}
