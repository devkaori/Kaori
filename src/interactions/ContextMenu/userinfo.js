const { CommandInteraction, Client } = require('discord.js');
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const axios = require("axios");

const model = require('../../database/models/badge');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Userinfo')
        .setType(2),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ ephemeral: false });
        const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
        if (!member) return client.errNormal({
            error: "Cet utilisateur n'est pas dans cette guilde !",
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
        };

        const flags = {
            DISCORD_EMPLOYEE: "Employé Discord",
            DISCORD_PARTNER: "Partenaire Discord",
            HYPESQUAD_EVENTS: "HypeSquad Events",
            BUGHUNTER_LEVEL_1: "Chercheur de bugs niveau 1",
            BUGHUNTER_LEVEL_2: "Chercheur de bugs niveau 2",
            EARLY_SUPPORTER: "Supporter précoce",
            TEAM_USER: "Utilisateur de l'équipe",
            SYSTEM: "Système",
            VERIFIED_BOT: "Bot vérifié",
            VERIFIED_DEVELOPER: "Développeur vérifié"
        };

        let Badges = await model.findOne({ User: member.user.id });
        if (!Badges) Badges = { User: member.user.id };
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = member.user.flags ? member.user.flags.toArray() : [];

        return client.embed({
            title: `Informations sur l'utilisateur`,
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
                    name: "Discriminateur",
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
                    name: "Drapeaux",
                    value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Aucun'}`,
                    inline: true,
                },
                {
                    name: "Badges",
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
        }, interaction);
    },
};