const Discord = require('discord.js');

const Schema = require("../../database/models/invites");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({ Guild: interaction.guild.id }).sort(([['Invites', 'descending']]));

    if (!rawLeaderboard) return client.errNormal({
        error: `<:non:1161484000272060548> Aucune donnée trouvée !`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map(e => `<:dash:1146416325892247684> \`${e.Invites}\` invitations pour <@!${e.User}>`);

    await client.createLeaderboard(`Tableau de score`, lb, interaction);
}
