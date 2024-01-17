const Discord = require('discord.js');
const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    const rawBirthdayboard = await Schema.find({ Guild: interaction.guild.id })

    if (rawBirthdayboard.length < 1) return client.errNormal({ 
        error: "Aucune date d'anniversaire trouvée !",
        type: 'editreply' 
    }, interaction);

    const lb = await Promise.all(rawBirthdayboard.map(async e => {
        let username = "Absent du serveur";
        try {
            const user = await client.users.fetch(e.User);
            if (user) {
                username = user.displayName;
            }
        } catch (error) {
            console.error(`Error fetching user with ID ${e.User}: ${error.message}`);
        }
        return `- **${username}** - ${e.Birthday} `;
    }));

    await client.createLeaderboard(`Anniversaires - ${interaction.guild.name}`, lb, interaction);
}
