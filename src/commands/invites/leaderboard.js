const Discord = require('discord.js');

const Schema = require("../../database/models/invites");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({ Guild: interaction.guild.id }).sort(([['Invites', 'descending']]));

    if (!rawLeaderboard) return client.errNormal({
        error: `Aucune donnée trouvée !`,
        image: `https://i.imgur.com/IFqedKi.png`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map(e => `- \`${e.Invites}\` invitations pour <@!${e.User}>`);

    await client.createLeaderboard(`Tableau de score`, lb, interaction);
}
