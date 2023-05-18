const Discord = require('discord.js');

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.GuildMember} oldMember 
 * @param {Discord.GuildMember} newMember 
 * @returns 
 */
module.exports = async (client, oldMember, newMember) => {
    if (!oldMember || !newMember) return;
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    if (removedRoles.size === 0 && addedRoles.size === 0 || removedRoles.size === addedRoles.size) return;    
    const logsChannel = await client.getLogs(newMember.guild.id);
    if (!logsChannel) return;

    var ostring = "";
    if (removedRoles.size === 0) ostring = "Aucun rôle supprimé";
    if (removedRoles.size > 0) removedRoles.forEach(element => { ostring += "<@&" + element + "> " });

    var nstring = "";
    if (addedRoles.size > 0) addedRoles.forEach(element => { nstring += "<@&" + element + "> " });

    await client.embed({
        title: `Rôles de ${newMember.user.username} ajustés`,
        desc: `Il y a des rôles modifiés`,
        fields: [
            {
                name: `> Anciens rôles`,
                value: `- ${ostring}`
            },
            {
                name: `> Nouveaux rôles`,
                value: `- ${nstring}`
            },
        ]
    }, logsChannel).catch(() => { });
};