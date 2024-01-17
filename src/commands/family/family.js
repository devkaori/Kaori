const Discord = require('discord.js');
const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {
    const target = interaction.options.getUser('user') || interaction.user;
    const data = await Schema.findOne({ Guild: interaction.guild.id, User: target.id });

    client.embed({
        title: `{target.username} - Famille`,
        image: `https://i.imgur.com/U9Fih4D.png`,
        thumbnail: target.avatarURL({ size: 1024 }),
        fields: [
            {
                name: 'Partenaire',
                value: data && data.Partner ? `<@!${data.Partner}>` : 'Cet utilisateur n\'est pas marié(e)'
            },
            {
                name: 'Parents',
                value: data && data.Parent.length > 0 ? data.Parent.map(parent => `- \`${parent}\``).join('\n') : 'Cet utilisateur n\'a pas de parents'
            },
            {
                name: 'Enfants',
                value: data && data.Children.length > 0 ? data.Children.map(child => `- \`${child}\``).join('\n') : 'Cet utilisateur n\'a pas d\'enfants'
            }
        ],
        type: 'editreply'
    }, interaction);
};
