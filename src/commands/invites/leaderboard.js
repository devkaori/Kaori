const Discord = require('discord.js');

const Schema = require("../../database/models/invites");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({ Guild: interaction.guild.id }).sort(([['Invites', 'descending']]));

    if (!rawLeaderboard) return client.errNormal({
        error: `<:non:1161484000272060548> Aucune donnée trouvée !`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map(e => `<:s_8greycd:1163191927877939260> <@!${e.User}> - Invitations : \`${e.Invites}\``);

    await client.createLeaderboard(`Invitations - ${interaction.guild.name}`, lb, interaction);
}
