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
                value: `<:Icon_Arrow_Right:1130937114041790514> ${data && data.Partner ? `<@!${data.Partner}>` : `<:Icon_Arrow_Right:1130937114041790514> Cet utilisateur n'est pas marié(e)`}`
            },
            {
                name: `<:icons_generalinfo:1130936294244102254> Parent`,
                value: `<:Icon_Arrow_Right:1130937114041790514> ${data && data.Parent.length > 0 ? `${data.Parent.join(", ")}` : `<:Icon_Arrow_Right:1130937114041790514> Cet utilisateur n'a pas de parents`}`
            },
            {
                name: `<:icons_Person:1130936290175615006> Enfants`,
                value: `<:Icon_Arrow_Right:1130937114041790514> ${data && data.Children.length > 0 ? `${data.Children.join(", ")}` : `<:Icon_Arrow_Right:1130937114041790514> Cet utilisateur n'a pas d'enfants`}`
            }
        ],
        type: 'editreply'
    }, interaction)
}
