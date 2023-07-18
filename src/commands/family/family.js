const Discord = require('discord.js');

const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user') || interaction.user;

    const data = await Schema.findOne({ Guild: interaction.guild.id, User: target.id });

    client.embed({
        title: `Famille de ${target.username}`,
        thumbnail: target.avatarURL({ size: 1024 }),
        fields: [
            {
                name: `<:icons_partner:1130936301290528898> Partenaire`,
                value: `${data && data.Partner ? `<@!${data.Partner}>` : `Cet utilisateur n'est pas marié(e)`}`
            },
            {
                name: `<:icons_generalinfo:1130936294244102254> Parent`,
                value: `${data && data.Parent.length > 0 ? `**${data.Parent.join(", ")}**` : `Cet utilisateur n'a pas de parents`}`
            },
            {
                name: `<:icons_Person:1130936290175615006> Enfants`,
                value: `${data && data.Children.length > 0 ? `**${data.Children.join(", ")}**` : `Cet utilisateur n'a pas d'enfants`}`
            }
        ],
        type: 'editreply'
    }, interaction)
}
